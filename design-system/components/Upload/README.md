# Upload
A drop zone for a resume: a dashed 1.5px ring on `bg` with a light Upload button, then the chosen file in the same place.

- `.bet-drop` holds a visually hidden `input[type=file]`, then `.bet-drop-empty` (the `.bet-btn-light` with the `upload` glyph, and "or drag and drop here").
- Dragging over: `.is-over` (primary ring, primary at 8% fill). Wrong type or too big: `.is-bad` and a `.bet-err` line that names the limit ("PDF, DOC or DOCX up to 10 MB").
- With a file: `.has-file` (solid ring) and `.bet-file`: a 40px `tint` square with the `document` glyph, the name and size, and quiet Replace / Remove buttons.
