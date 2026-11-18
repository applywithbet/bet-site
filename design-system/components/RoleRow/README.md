# RoleRow
A row that opens something: a title, one line, a meta line, and an Apply pill that turns dark when the row is pointed at.

- `ul.bet-roles` of `li > a.bet-role`. Rows are split by faded `line`s; the row fills with `tint` (18px radius) on hover, overhanging the column by 16px each side.
- `.bet-role-title` (display, 700), `.bet-role-desc` (one line, `muted`), `.bet-meta-line` with `•` separators in `.dot` and the pay in `.pay` (ink).
- `.bet-role-apply` is glass at rest and the dark pill on row hover; on phones it is a round arrow.
- Keep it to title, one line, meta line. No extra chips or badges.
