# react-native-utils

A personal collection of **React Native utilities and patterns** extracted from real projects and production issues.

This repository is **not intended as a published library**.  
Its primary purpose is to act as a **long-term technical archive** — something I can revisit later and immediately remember *why* certain decisions were made.

---

## 📦 Included Utilities

- `keyboard-inset`  
  Utilities for handling keyboard height, safe-area insets, and toolbar overlays on iOS / Android.

- `editors/quill-editor`  
  A stable text editor setup for React Native using **Quill + WebView**, designed to avoid `TextInput` limitations around undo/redo, cursor stability, and multiline editing.

---

# ✍️ Quill Editor (React Native + WebView)

> A deliberate decision to stop fighting `TextInput`  
> and instead combine a **proven editor engine (Quill)** with native React Native UI.

---

## Why this exists

Repeated issues encountered with React Native `TextInput`:

- Unreliable undo / redo behavior
- Cursor instability in multiline inputs (especially on iOS)
- Platform inconsistencies between iOS and Android
- Complex and fragile state synchronization

**Conclusion:**  
Text editing is a solved problem — but not in React Native core.  
Let the editor engine handle editing, and let RN handle UI.

---

## Core Architecture (Important)

Clear separation of responsibilities:

| Responsibility | Owner |
|---|---|
| Text input, undo/redo | Quill (inside WebView) |
| UI (buttons, layout, keyboard handling) | React Native |
| Undo/redo state (`canUndo`, `canRedo`) | Parent screen |
| Cursor / selection | Quill only (never controlled from RN) |

---

## Directory Structure

```
components/editors/quill-editor/
├─ quill.html          // Quill setup + history + postMessage bridge
├─ QuillEditor.tsx     // WebView wrapper + imperative API
├─ types.ts            // Public types
├─ index.ts            // Exports
├─ README.md           // Component-level notes
```

Additional UI:

```
UndoRedoToolbar.tsx    // Native undo / redo toolbar
```

---

## Basic Usage

### 1️⃣ Create a ref

```ts
import type { QuillEditorHandle } from '@/components/editors/quill-editor';

const editorRef = useRef<QuillEditorHandle>(null);
```

---

### 2️⃣ Render the editor

```tsx
<QuillEditor
  ref={editorRef}
  value={initialText}
  onChange={setCurrentText}
  onHistoryChange={({ canUndo, canRedo }) => {
    setCanUndo(canUndo);
    setCanRedo(canRedo);
  }}
/>
```

- `value`  
  Used **only for initial content**
- `onChange`  
  One-way data flow from Quill → React Native
- `onHistoryChange`  
  Receives undo/redo availability from Quill

---

### 3️⃣ Native undo / redo toolbar

```tsx
<UndoRedoToolbar
  canUndo={canUndo}
  canRedo={canRedo}
  onUndo={() => editorRef.current?.undo()}
  onRedo={() => editorRef.current?.redo()}
/>
```

**Important:**  
Undo/redo is handled **exclusively** by Quill’s internal history.  
React Native never maintains its own undo stack.

---

## Initial Content Rules (Critical)

- Send initial text **once**, after WebView load (`onLoadEnd`)
- Use `quill.setText(text, 'silent')`
- Never push text from RN to Quill again during editing

This preserves:
- Undo stack integrity
- Cursor stability
- Predictable behavior

---

## postMessage Protocol (Summary)

### React Native → Quill

```ts
{ type: 'SET_TEXT', payload: { text } }
{ type: 'UNDO' }
{ type: 'REDO' }
```

### Quill → React Native

```ts
{ type: 'CHANGE', payload: { text } }
{ type: 'HISTORY', payload: { canUndo, canRedo } }
```

---

## Undo / Redo State Synchronization Rules

- Never calculate `canUndo` / `canRedo` in React Native
- Never update undo state directly on button press
- Trust **only** the `HISTORY` events emitted by Quill

This avoids intermediate or inconsistent states.

---

## iOS-Specific Notes

### Message listeners

To support both platforms reliably:

```js
window.addEventListener('message', handler);
document.addEventListener('message', handler);
```

### Prevent zoom on rapid taps

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

```css
#toolbar,
#toolbar * {
  touch-action: manipulation;
  user-select: none;
}
```

---

## Things Not To Do (Lessons Learned)

- Do not implement undo/redo manually in RN
- Do not sync cursor or selection into React state
- Do not try to “fix” TextInput edge cases endlessly

---

## Final Note

> **Treat the editor as an engine.  
> Treat React Native as the controller.  
> Everything becomes simpler and more stable.**
