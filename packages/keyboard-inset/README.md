# @react-native-utils/keyboard-inset

A set of React Native hooks for handling keyboard insets, overlays, and stable cursor behavior across iOS and Android.

This library solves common but tricky issues such as:
- Incorrect keyboard height on Android
- Floating toolbars hidden behind the keyboard
- Cursor jumping on iOS during undo/redo
- Stable selection handling for TextInput

---

## ✨ Features

- 📐 Accurate keyboard inset calculation (iOS & Android)
- 🧩 Overlay registration system (toolbars, accessories, etc.)
- 🔄 Undo / Redo with stable cursor restoration
- 🍎 iOS cursor offset fixes
- 🤖 Android keyboard behavior normalization
- ⚙️ Fully typed (TypeScript)

---

## 📦 Installation

```bash
npm install @minbong/keyboard-inset
# or
yarn add @minbong/keyboard-inset
```

---

## 🚀 Basic Usage

```ts
import { useKeyboardInset } from '@minbong/keyboard-inset';

const { keyboardInset, keyboardVisible } = useKeyboardInset();
```

### API

#### `useKeyboardInset()`

```ts
const {
  keyboardInset,   // number: bottom inset to apply
  keyboardVisible, // boolean: whether the keyboard is visible
  registerOverlay, // (height: number) => () => void
} = useKeyboardInset();
```

- `keyboardInset`: Calculated bottom inset that accounts for the keyboard and any registered overlays.
- `keyboardVisible`: Whether the keyboard is currently visible.
- `registerOverlay(height)`: Registers an overlay (e.g. toolbar).  
  Returns a cleanup function that unregisters it on unmount.

```tsx
<View style={{ position: 'absolute', bottom: keyboardInset }}>
  ...
</View>
```

---

## 🧩 Registering an Overlay (Toolbar, Accessory, etc.)

If your screen has a floating toolbar that should sit above the keyboard:

```ts
const { registerOverlay } = useKeyboardInset();

useEffect(() => {
  return registerOverlay(44); // overlay height
}, []);
```
The inset will automatically adjust while the overlay is mounted.

---

## 🔄 Undo / Redo with Stable Cursor

```ts
import { useUndoRedoWithSelection } from '@minbong/keyboard-inset';

const {
  currentText,
  commitHistory,
  undoStep,
  redoStep,
  registerSelection,
} = useUndoRedoWithSelection({
  initialValue: '',
  inputRef,
});
```

```tsx
<TextInput
  ref={inputRef}
  value={currentText}
  onChangeText={commitHistory}
  onSelectionChange={e =>
    registerSelection(e.nativeEvent.selection)
  }
/>
```
### ✅ Cursor behavior
- Normal typing: cursor is untouched
- Undo / Redo: cursor is restored accurately
- iOS mid-text edits: no jumping

---

## ⚠️ iOS Notes

On iOS, `TextInput` selection can be off by one after undo/redo operations.
This library applies a platform-specific correction **only during history navigation**.
Normal typing and mid-text edits are never interfered with.

---

## 🧠 Design Philosophy

- Hooks report facts, not assumptions
- UI components declare their presence
- Cursor control is applied only when necessary

``Cursor position should only be restored during undo/redo, never during normal typing.``

---

## ❓ Why this library exists

React Native does not provide a reliable, cross-platform way to:

- Measure the real keyboard inset on Android
- Keep floating toolbars above the keyboard
- Preserve cursor position during undo/redo on iOS

This package addresses those gaps with a small, focused set of hooks that follow
React's rules and native platform behaviors.
