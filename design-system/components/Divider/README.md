# Divider
Every line fades out at both ends: clear at the edges, full strength by 10%.

- `hr.bet-divider` (1.5px, `hairline`) between cards and sections; `.bet-divider-solid` (1px, `line`) above a copyright or between rows.
- On an existing border: `border-image: linear-gradient(90deg, transparent, COLOUR 10%, COLOUR 90%, transparent) 1` (`.bet-rule-top`, `.bet-rule-bottom`).
- Prefer space and alignment to lines. A panel gets at most one line inside it; never build a grid of hairlines.
