# Changelog

## 0.1.3
- Disabled cursor (selection) restoration on iOS when using multiline TextInput.
- This change avoids native UITextView conflicts that break undo/redo behavior.
- Undo/redo now restores text value only on iOS multiline inputs, letting iOS manage the cursor.
