// Bet's roles. careers.html lists them and job.html shows one (job.html?role=<slug>), so this is the only
// place a title, pay range or description needs changing.
//
// applyEndpoint: the Google Apps Script web app that emails applications (see apps-script/apply.gs for the
// five minute setup). Until it's filled in, the Submit button opens the applicant's email app with the
// application written out, addressed to the inbox below, and asks them to attach their resume.
window.BET_JOBS = {
  inbox: 'applywithbet@gmail.com',
  applyEndpoint: 'https://script.google.com/macros/s/AKfycbzmcQnZ-bZuyF4-dejXsO5uKRrGTsu6oeTITHEQ9y8O5NdRqUndYGH1dp8sYYCvZG7y-A/exec',

  location: 'New York, NY',
  locationLong: 'New York office',
  employmentType: 'Full time',
  workplace: '5 days in office',

  company: {
    heading: 'What is Bet?',
    paragraphs: [
      `Bet is a job board that applies for you. You import your resume, answer a few questions, and Bet builds you a dashboard of jobs picked for you, with new ones coming in every hour. When you find one you like, our Chrome extension fills out the application in about a minute. The tracker keeps every application, interview and rejection in one place.`,
      `Most people hate applying to jobs, and they're right to. You end up typing the same resume into a hundred different forms. We'd rather you spend that time getting ready for the interview.`,
      `We're a small team in New York, and we're in the office together five days a week. We ship every week, we talk to users all the time, and people here own real things from their first month.`
    ]
  },

  benefits: [
    `Health, dental and vision, with 100% of premiums covered for you and your family`,
    `401(k) match`,
    `Lunch on us every office day`,
    `Commuter and gym stipend`
  ],

  hiring: {
    heading: 'How we hire',
    steps: [
      `A 30 minute call with someone on the team`,
      `A short exercise based on the actual work`,
      `An afternoon at our New York office`,
      `References, then an offer`
    ],
    note: `Most people go from first call to offer in about two weeks.`
  },

  teams: [
    { id: 'go-to-market', name: 'Go to market' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'product', name: 'Product' },
    { id: 'design', name: 'Design' },
    { id: 'business-operations', name: 'Business operations' },
    { id: 'legal', name: 'Legal', empty: `Nothing open right now. Keep yourself posted.` }
  ],

  roles: [
    {
      slug: 'sales-development-representative',
      team: 'go-to-market',
      title: 'Sales Development Representative',
      blurb: `Cold calls, warm intros, zero fear. 1–2 years in sales and that dog in you.`,
      pay: '$110K – $140K',
      commission: true,
      about: `You'll be the first person a lot of our customers talk to. Bet is free for job seekers, and we also sell it to the schools, bootcamps and career centers that help people find work. You'll work that second group: find the people who make the call, get them on the phone, and hand warm meetings to our B2B lead.`,
      doing: [
        `Research career centers, bootcamps and workforce programs, and figure out who actually buys`,
        `Write cold emails that don't read like cold emails, and make the calls too`,
        `Book 15 to 20 qualified meetings a month once you're ramped`,
        `Keep the CRM clean enough that someone could pick up your pipeline tomorrow`,
        `Tell product what you're hearing. A lot of our roadmap starts as an objection on a sales call`
      ],
      want: [
        `1–2 years as an SDR or BDR, ideally selling software`,
        `You can hear no all day and still sound good on the next call`,
        `You write clearly and think fast on the phone`,
        `You want to close deals one day, and you want us to help you get there`
      ],
      bonus: [
        `You've sold into higher ed or edtech`,
        `You've used a job board recently and have opinions about it`
      ]
    },
    {
      slug: 'gtm-lead-b2b',
      team: 'go-to-market',
      title: 'GTM Lead, B2B',
      blurb: `Sell Bet to universities, bootcamps and career centers. 1–2 years closing. Allergic to "circling back".`,
      pay: '$140K – $190K',
      commission: true,
      about: `A lot of job seekers find Bet through someone else: a university career office, a bootcamp, an outplacement firm. This role owns that channel. You'll close our first institutional deals, work out pricing with the founders, and write the playbook the next few sellers will use.`,
      doing: [
        `Run deals from first call to signed contract`,
        `Work with our SDR on target lists and outbound messaging`,
        `Set up pilots with career centers and turn them into paid contracts`,
        `Figure out pricing and packaging for schools and programs`,
        `Write down what works so someone else can repeat it`
      ],
      want: [
        `1–2 years closing B2B deals, as an AE or in a mixed SDR and AE role`,
        `You've run a full sales cycle on your own more than once`,
        `You're fine with an early, messy process and good at making it less messy`,
        `You can explain a product to someone who has never seen it in under two minutes`
      ],
      bonus: [
        `You've sold to universities or nonprofits`,
        `You've been the first salesperson somewhere`
      ]
    },
    {
      slug: 'gtm-lead-b2c',
      team: 'go-to-market',
      title: 'GTM Lead, B2C',
      blurb: `Get Bet in front of every job seeker in America. 1–2 years in growth. Built different.`,
      pay: '$130K – $180K',
      commission: true,
      about: `This is the consumer side. Every week a lot of people start looking for a new job, and we want Bet to be the first thing they hear about. You'll own how we reach them: content, creators, campus, referrals, paid, whatever works. There's a budget and a lot of room to try things.`,
      doing: [
        `Run experiments on TikTok, Instagram, YouTube, Reddit and college campuses`,
        `Find and work with creators who talk about jobs and careers`,
        `Build a referral loop so users bring their friends`,
        `Track what each channel costs and what it brings in, and cut what isn't working`,
        `Work with design on landing pages and launches`
      ],
      want: [
        `1–2 years in growth or marketing at a consumer company`,
        `Something you grew, with numbers, and a story about how`,
        `You're very online and know what's working on each platform this month`,
        `You're comfortable in a spreadsheet. Some days you'll live there`
      ],
      bonus: [
        `You make content yourself`,
        `You've managed a real paid budget`
      ]
    },
    {
      slug: 'strategic-partnerships-manager',
      team: 'go-to-market',
      title: 'Strategic Partnerships Manager',
      blurb: `Make friends with every job board and ATS on earth. 1–2 years in partnerships or BD. Big group-chat energy.`,
      pay: '$140K – $185K',
      commission: true,
      about: `Bet works best when it's plugged into the places jobs already live. You'll build relationships with job boards, applicant tracking systems, staffing firms and anyone else who can send us jobs or job seekers. Some of these will be integrations, some will be distribution deals, and some will be both.`,
      doing: [
        `Find partners, pitch them and negotiate the deal`,
        `Scope integrations with engineering and keep them moving`,
        `Look after partners once they're live so they actually send volume`,
        `Keep a clear list of which partnerships are worth our time and which aren't`
      ],
      want: [
        `1–2 years in partnerships, business development or sales`,
        `You follow up without anyone reminding you`,
        `You can read a contract and find the three lines that matter`,
        `You like being the person who knows everyone`
      ],
      bonus: [
        `You've worked in HR tech or recruiting`,
        `You've launched an integration partnership before`
      ]
    },
    {
      slug: 'backend-engineer',
      team: 'engineering',
      title: 'Backend Engineer',
      blurb: `Scrapers, queues and a job index that refreshes every hour. 1–2 years shipping Python or Go. Deploys on Fridays, no fear.`,
      pay: '$170K – $230K',
      about: `Bet pulls in new jobs every hour and matches them to each person's profile. Behind that are scrapers, queues, a search index and a lot of data cleanup. You'll own big pieces of it. The system is young, so you'll make real calls about how it's built.`,
      doing: [
        `Build and run the pipeline that collects, cleans and dedupes job postings`,
        `Improve how we match jobs to people, and measure whether it actually got better`,
        `Keep things fast and stable as more people sign up`,
        `Work on the API the dashboard and the Chrome extension talk to`,
        `Take a turn on call a few days a month. It's quiet, and we'd like to keep it that way`
      ],
      want: [
        `1–2 years writing backend code in production, in Python, Go or TypeScript`,
        `Comfortable with Postgres and at least one queue or job system`,
        `You've chased a bug in production down to its real cause`,
        `You care about the unglamorous stuff: tests, logs, alerts`
      ],
      bonus: [
        `You've built a scraper or crawler that ran at scale`,
        `Search or ranking experience`
      ]
    },
    {
      slug: 'software-engineer',
      team: 'engineering',
      title: 'Software Engineer',
      blurb: `The dashboard, the autofill, the tracker. 1–2 years of TypeScript and opinions you can defend.`,
      pay: '$160K – $220K',
      about: `This role is mostly the parts of Bet people see: the dashboard, the autofill extension and the tracker. You'll ship features end to end and talk to the people using them. We want engineers who care how something feels, not only whether it works.`,
      doing: [
        `Build features from first sketch to release`,
        `Work on the Chrome extension that fills out applications on hundreds of different sites`,
        `Make the dashboard faster and easier to use`,
        `Fix bugs users report, a lot of the time on the same day`,
        `Review code and help keep the codebase in good shape`
      ],
      want: [
        `1–2 years of professional TypeScript and React`,
        `You've shipped features that real people depend on`,
        `You notice when a page feels slow or an animation is a little off`,
        `You can explain your decisions, and change your mind when someone has a better idea`
      ],
      bonus: [
        `You've built a browser extension`,
        `You've worked at an early stage startup`
      ]
    },
    {
      slug: 'product-manager',
      team: 'product',
      title: 'Product Manager',
      blurb: `Own the loop from "job posted" to "application sent". 1–2 years in product. Talks to users more than to Slack.`,
      pay: '$150K – $200K',
      about: `You'll own the path from a job being posted to an application going out, and everything a user sees along the way. You'll decide what we build next and why, then work with a few engineers and a designer to get it shipped.`,
      doing: [
        `Talk to users every week, on calls and in support tickets`,
        `Turn what you hear into a plan, and write specs people actually read`,
        `Set goals for your area and keep track of them`,
        `Cut scope when you need to so we ship on time`,
        `Work with go to market so what we sell matches what we build`
      ],
      want: [
        `1–2 years as a PM, or close to it in engineering, design or consulting`,
        `You've shipped something and can tell us what happened after launch`,
        `You write well. Most decisions here start as a doc`,
        `You can write a SQL query, or you'll learn quickly`
      ],
      bonus: [
        `A technical background`,
        `You've been through a job search recently and remember how painful it was`
      ]
    },
    {
      slug: 'product-designer',
      team: 'design',
      title: 'Product Designer',
      blurb: `Make a job board people actually want to use. 1–2 years, Figma fluent, taste you can't teach.`,
      pay: '$140K – $190K',
      about: `Bet only works if it's easier than applying on your own, so design matters a lot here. You'll design the dashboard, the extension and the tracker, and you'll have a say in how the brand looks everywhere else, this page included.`,
      doing: [
        `Design features from rough flows to final screens`,
        `Prototype interactions and motion, not only static mockups`,
        `Run quick tests with users and act on what you learn`,
        `Keep our components and styles consistent as the product grows`,
        `Stay close to engineers through the build instead of handing off files and leaving`
      ],
      want: [
        `1–2 years designing software products`,
        `A portfolio that shows how you think, not only the final screens`,
        `Strong in Figma`,
        `You care about spacing, type and copy more than most people think is reasonable`
      ],
      bonus: [
        `You can write some front end code`,
        `Motion design`
      ]
    },
    {
      slug: 'business-operations-associate',
      team: 'business-operations',
      title: 'Business Operations Associate',
      blurb: `Spreadsheets, vendors, hiring, whatever's on fire. 1–2 years in ops, consulting or a startup. Unbothered.`,
      pay: '$110K – $150K',
      about: `You'll keep the company running so everyone else can focus. In a given week that could mean setting up a new vendor, pulling numbers for an investor update, planning an offsite or helping hire the next five people. It's a wide role and it grows with you.`,
      doing: [
        `Own our vendors, tools and contracts`,
        `Help run recruiting: scheduling, coordinating interviews, keeping candidates in the loop`,
        `Build and update the reports the team uses to track the business`,
        `Work with the Head of Finance on budgets and spend`,
        `Pick up the projects nobody owns yet`
      ],
      want: [
        `1–2 years in operations, consulting, banking or at a startup`,
        `Very organized. Things don't fall through the cracks with you`,
        `Good with spreadsheets`,
        `You stay calm when three things break at once`
      ],
      bonus: [
        `You've coordinated recruiting before`,
        `Experience with HR or payroll tools`
      ]
    },
    {
      slug: 'head-of-finance',
      team: 'business-operations',
      title: 'Head of Finance',
      blurb: `Own the model, the raise and the runway. 10+ years in investment banking. Must have that dog in you.`,
      pay: '$275K – $325K',
      about: `We're hiring our first senior finance person. You'll own the model, the budget and the next fundraise, and you'll work closely with the founders on every big decision. This is the one role on the page that isn't early career.`,
      doing: [
        `Build and own the financial model and the monthly reporting`,
        `Lead fundraising prep: the data room, the model and investor questions`,
        `Set up budgets and spend controls that hold up as the team grows`,
        `Run accounting, tax and audit with outside partners`,
        `Advise the founders on pricing, hiring plans and runway`
      ],
      want: [
        `10+ years in investment banking`,
        `You've worked on raises or M&A and know how investors think`,
        `Hands on. You'll build the model yourself before you hire someone to do it`,
        `You can explain the numbers to people who aren't finance people`
      ],
      bonus: [
        `Time in finance at a startup or growth company`,
        `CFA or CPA`
      ]
    }
  ]
};
