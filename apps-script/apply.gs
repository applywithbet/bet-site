/**
 * Bet job applications.
 *
 * The job pages on applywithbet.com (job.html) post each application here. This script emails it to the
 * Bet inbox with the resume attached and the applicant as Reply-To, then sends the applicant a short
 * confirmation from this same account. Nothing is stored anywhere else.
 *
 * Setup, about five minutes, signed in to Google as applywithbet@gmail.com:
 *  1. Go to https://script.google.com and click "New project". Rename it "Bet applications".
 *  2. Delete everything in Code.gs, paste in this whole file, and click Save.
 *  3. Click Deploy > New deployment. Click the gear next to "Select type" and choose "Web app".
 *     Execute as: Me. Who has access: Anyone. Click Deploy.
 *  4. Google asks for permission. Choose the account, then Advanced > "Go to Bet applications (unsafe)"
 *     > Allow. It says unsafe only because the script isn't published on Google's marketplace. All it
 *     can do is send email from this account.
 *  5. Copy the Web app URL (it ends in /exec) and paste it into applyEndpoint at the top of jobs.js.
 *  6. Open that URL in a browser. You should see "Bet applications is running."
 *
 * If you change this file later: Deploy > Manage deployments > pencil icon > Version: New version > Deploy.
 * That keeps the same URL, so jobs.js doesn't need to change.
 *
 * Gmail lets a free account send about 100 emails a day. Each application uses two (one to the inbox, one
 * confirmation), so that's roughly 50 applications a day. Past that, the page asks people to email
 * their resume to the inbox instead.
 */

const INBOX = 'applywithbet@gmail.com';
const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const RESUME_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

// Titles the confirmation email will name. An application for anything else still reaches the inbox; the
// applicant's confirmation just says "a role at Bet". Keep this in step with the titles in jobs.js.
const ROLE_TITLES = [
  'Sales Development Representative',
  'GTM Lead, B2B',
  'GTM Lead, B2C',
  'Strategic Partnerships Manager',
  'Backend Engineer',
  'Software Engineer',
  'Product Manager',
  'Product Designer',
  'Business Operations Associate',
  'Head of Finance'
];

// The questions on the form, in the order the inbox email lists them. Long answers keep their line breaks.
const FIELDS = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['linkedin', 'LinkedIn'],
  ['website', 'Website or portfolio'],
  ['links', 'Other links', true],
  ['why', 'Why Bet?', true],
  ['currentTitle', 'Current or most recent title'],
  ['currentCompany', 'Current or most recent company'],
  ['years', 'Years of full-time experience'],
  ['authorized', 'Authorized to work in the US'],
  ['sponsorship', 'Needs visa sponsorship'],
  ['office', 'OK with 5 days a week in the New York office'],
  ['start', 'Could start'],
  ['source', 'Heard about Bet from'],
  ['notes', 'Anything else', true]
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function doGet() {
  return ContentService.createTextOutput('Bet applications is running.');
}

function doPost(e) {
  try {
    let d;
    try { d = JSON.parse(e.postData.contents); } catch (err) { return reply({ ok: false, error: 'bad_request' }); }
    if (!d || typeof d !== 'object') return reply({ ok: false, error: 'bad_request' });

    // Bots: the hidden field only a bot fills in, and a form sent faster than a person could fill it.
    // Both get a normal-looking answer and nothing is sent.
    if (d.company_url) return reply({ ok: true });
    if (!(Number(d.elapsed) >= 3000)) return reply({ ok: true });

    const problem = validate(d);
    if (problem) return reply({ ok: false, error: problem });

    const ext = extension(d.resume.name);
    const bytes = Utilities.base64Decode(d.resume.data);
    if (bytes.length > MAX_RESUME_BYTES) return reply({ ok: false, error: 'too_big' });

    if (!allow(d.email)) return reply({ ok: false, error: 'too_many' });
    if (MailApp.getRemainingDailyQuota() < 2) return reply({ ok: false, error: 'quota' });

    const resume = Utilities.newBlob(bytes, RESUME_TYPES[ext], resumeName(d, ext));
    const role = clean(d.role, 120);

    MailApp.sendEmail({
      to: INBOX,
      replyTo: d.email.trim(),
      name: 'Bet careers',
      subject: 'Application for ' + role + ' from ' + clean(d.name, 120),
      body: inboxText(d),
      htmlBody: inboxHtml(d),
      attachments: [resume]
    });

    // The application is in the inbox now. If the applicant's confirmation fails (a bad address, say), the
    // application still counts; the page just doesn't claim a confirmation went out. Failures show up under
    // Executions in the Apps Script editor.
    // The confirmation is written to look like what it is, a short note from a person: plain text, no
    // links, no slogan. Gmail's spam filter is wary of styled HTML and links to a different domain coming
    // from a gmail.com address, and of gambling-sounding words ("Bet on yourself").
    let confirmed = true;
    try {
      MailApp.sendEmail({
        to: d.email.trim(),
        replyTo: INBOX,
        name: 'Bet Careers',
        subject: ROLE_TITLES.indexOf(role) >= 0 ? 'Your application for ' + role : 'Your application to Bet',
        body: confirmText(d)
      });
    } catch (err) {
      confirmed = false;
      console.error('Confirmation to ' + d.email.trim() + ' failed: ' + err);
    }

    return reply({ ok: true, confirmed: confirmed });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: 'server' });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function validate(d) {
  const text = (v, max, required) => {
    if (v == null || v === '') return !required;
    return typeof v === 'string' && v.length <= max && (!required || v.trim() !== '');
  };
  if (!text(d.role, 120, true)) return 'role';
  if (!text(d.name, 120, true)) return 'name';
  if (!text(d.email, 200, true) || !EMAIL_RE.test(d.email.trim())) return 'email';
  if (!text(d.why, 5000, true)) return 'why';
  for (const k of ['authorized', 'sponsorship', 'office']) {
    if (d[k] !== 'Yes' && d[k] !== 'No') return k;
  }
  for (const k of ['phone', 'linkedin', 'website', 'currentTitle', 'currentCompany', 'years', 'start', 'source', 'team', 'page']) {
    if (!text(d[k], 500, false)) return k;
  }
  for (const k of ['links', 'notes']) {
    if (!text(d[k], 3000, false)) return k;
  }
  const r = d.resume;
  if (!r || typeof r.name !== 'string' || typeof r.data !== 'string' || !r.data) return 'resume';
  if (!RESUME_TYPES[extension(r.name)]) return 'resume_type';
  if (r.data.length > Math.ceil(MAX_RESUME_BYTES / 3) * 4 + 8) return 'too_big';
  return '';
}

// At most 3 applications per email address every 6 hours, and 40 an hour in total, so the form can't be
// used to send confirmation emails to strangers in bulk.
function allow(email) {
  const cache = CacheService.getScriptCache();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return false;
  try {
    const mine = 'a:' + email.trim().toLowerCase();
    const all = 'all:' + new Date().toISOString().slice(0, 13);
    const n = Number(cache.get(mine) || 0);
    const total = Number(cache.get(all) || 0);
    if (n >= 3 || total >= 40) return false;
    cache.put(mine, String(n + 1), 6 * 60 * 60);
    cache.put(all, String(total + 1), 60 * 60);
    return true;
  } finally {
    lock.releaseLock();
  }
}

function extension(fileName) {
  const m = /\.([a-z0-9]+)$/i.exec(String(fileName || ''));
  return m ? m[1].toLowerCase() : '';
}

function resumeName(d, ext) {
  const who = clean(d.name, 80).replace(/[^\p{L}\p{N} '-]/gu, '').trim().replace(/\s+/g, ' ') || 'Applicant';
  return who + ' - Resume.' + ext;
}

// One line of text: no line breaks or control characters (names, the role, subjects).
function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

// A long answer: keeps its line breaks, drops other control characters.
function block(v, max) {
  return String(v == null ? '' : v).replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function answer(d, k, long) {
  return long ? block(d[k], 5000) : clean(d[k], 500);
}

function firstName(d) {
  const first = clean(d.name, 120).split(/\s+/)[0] || '';
  return first.replace(/[^\p{L}'-]/gu, '').slice(0, 40);
}

function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Links stay clickable in the inbox email; everything else is plain text.
function cellHtml(v) {
  const s = String(v);
  return esc(s).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" style="color:#5b3ad1">$1</a>').replace(/\n/g, '<br>');
}

function inboxText(d) {
  const lines = ['New application for ' + clean(d.role, 120) + (d.team ? ' (' + clean(d.team, 60) + ')' : ''), ''];
  FIELDS.forEach(([k, label, long]) => {
    const v = answer(d, k, long);
    if (v) lines.push(long ? '\n' + label + '\n' + v + '\n' : label + ': ' + v);
  });
  lines.push('');
  lines.push('Resume: attached (' + clean(d.resume.name, 200) + ')');
  if (d.page) lines.push('Sent from: ' + clean(d.page, 300));
  lines.push('', 'Reply to this email to answer ' + clean(d.name, 120) + ' directly.');
  return lines.join('\n');
}

function inboxHtml(d) {
  const rows = FIELDS
    .filter(([k, , long]) => answer(d, k, long))
    .map(([k, label, long]) =>
      '<tr><td style="padding:10px 16px 10px 0;vertical-align:top;color:#6b6880;white-space:nowrap">' + esc(label) +
      '</td><td style="padding:10px 0;vertical-align:top;color:#1b1840">' + cellHtml(answer(d, k, long)) + '</td></tr>')
    .join('');
  return '<div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1b1840;max-width:640px">' +
    '<p style="margin:0 0 4px;color:#6b6880">New application' + (d.team ? ' · ' + esc(clean(d.team, 60)) : '') + '</p>' +
    '<h1 style="margin:0 0 20px;font-size:22px">' + esc(clean(d.role, 120)) + '</h1>' +
    '<table style="border-collapse:collapse;width:100%">' + rows +
    '<tr><td style="padding:10px 16px 10px 0;color:#6b6880">Resume</td><td style="padding:10px 0">Attached: ' + esc(clean(d.resume.name, 200)) + '</td></tr>' +
    '</table>' +
    '<p style="margin:24px 0 0;color:#6b6880;font-size:13px">Reply to this email to answer ' + esc(clean(d.name, 120)) + ' directly.' +
    (d.page ? ' Sent from ' + esc(clean(d.page, 300)) + '.' : '') + '</p></div>';
}

function confirmText(d) {
  const role = clean(d.role, 120);
  const known = ROLE_TITLES.indexOf(role) >= 0;
  const first = firstName(d);
  return [
    first ? 'Hi ' + first + ',' : 'Hi,',
    '',
    (known ? 'Thanks for applying to be our ' + role + '.' : 'Thanks for applying to Bet.') +
      ' Your application came through and it\'s with the team now.',
    '',
    'We read every application, and we\'ll get back to you if it\'s a fit. If you want to add anything, just reply to this email.',
    '',
    'Thanks,',
    'The Bet team'
  ].join('\n');
}
