export type QuillEditorHandle = {
  undo: () => void;
  redo: () => void;
  focus: () => void;
};

export type QuillEditorProps = {
  value: string;
  onChange: (text: string) => void;

  placeholder?: string;

  multiline?: boolean;   // default true
  height?: number;       // default 200

  onUndoAvailable?: (canUndo: boolean) => void;
  onRedoAvailable?: (canRedo: boolean) => void;
};
