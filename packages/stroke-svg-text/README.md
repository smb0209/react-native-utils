# @minbong/stroke-svg-text

SVG-based outlined text component for React Native.

This component renders text with a stroke using SVG, providing consistent results across iOS and Android.

---

## Features

- SVG-based text stroke rendering
- Consistent appearance across platforms (iOS & Android)
- Written in TypeScript
- Lightweight and easy to integrate
- Suitable for decorative or animation-heavy UI

---

## Installation

```bash
npm install @minbong/stroke-svg-text
```

---

## Peer Dependency

This package relies on `react-native-svg`.  
Make sure it is installed in your project:

```bash
npm install react-native-svg
```

---

## Usage

```tsx
import { StrokeSvgText } from '@minbong/stroke-svg-text';

<StrokeSvgText
  text="Hello World"
  fontSize={32}
  fill="#FFFFFF"
  stroke="#000000"
  strokeWidth={2}
/>
```

---

## Props

| Name        | Type   | Default | Description     |
|-------------|--------|---------|-----------------|
| text        | string | —       | Text content    |
| fontSize    | number | 32      | Font size       |
| fill        | string | #FFFFFF | Text fill color |
| stroke      | string | #000000 | Stroke color    |
| strokeWidth | number | 2       | Stroke width    |
| fontFamily  | string | —       | Custom font     |

---

## Notes

- SVG rendering avoids platform-specific text stroke issues
- Requires `react-native-svg`
- Designed as a small utility, not a full UI framework

---

## License

MIT
