import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useUndoRedo } from './useUndoRedo';

export type Selection = {
  start: number;
  end: number;
};

type TextSnapshot = {
  text: string;
  selection: Selection;
};

export function useUndoRedoWithSelection ({
                                            initialValue,
                                            inputRef,
                                          }: {
  initialValue: string;
  inputRef?: React.RefObject<any>;
}) {
  const lastSelectionRef = useRef<Selection> ({
    start: initialValue.length,
    end: initialValue.length,
  });

  const undoCore = useUndoRedo<TextSnapshot> ({
    text: initialValue,
    selection: {
      start: initialValue.length,
      end: initialValue.length,
    },
  });

  const isHistoryNavigationRef = useRef(false);

  const undoStep = () => {
    isHistoryNavigationRef.current = true;
    undoCore.undo();
  };

  const redoStep = () => {
    isHistoryNavigationRef.current = true;
    undoCore.redo();
  };

  /**
   * ✅ selection change는 "참고용"
   * (undo 복원 시 사용)
   */
  const registerSelection = (selection: Selection) => {
    lastSelectionRef.current = selection;
  };

  /**
   * ✅ commit 시점에 selection을 "확정"해서 만든다
   */
  const commitHistory = (text: string) => {
    undoCore.set({
      text,
      selection: lastSelectionRef.current,
    });
  };

  /**
   * ✅ undo / redo 이후 커서 복원
   */
  useEffect (() => {
    if (!isHistoryNavigationRef.current) return;
    if ( !inputRef?.current) return;

    requestAnimationFrame (() => {
      let selectionToRestore = undoCore.state.selection;
      const textLength = undoCore.state.text.length;
      if (Platform.OS === 'ios' && selectionToRestore.start < textLength) {
        selectionToRestore = {
          start: selectionToRestore.start + 1,
          end: selectionToRestore.end + 1,
        };
      }
      inputRef.current.setNativeProps?. ({
        selection: selectionToRestore,
      });
      isHistoryNavigationRef.current = false;
    });
  }, [undoCore.state, inputRef]);

  return {
    currentText: undoCore.state.text,
    commitHistory,
    undoStep,
    redoStep,
    canUndo: undoCore.canUndo,
    canRedo: undoCore.canRedo,
    registerSelection,
    resetHistory: (text: string) =>
      undoCore.reset ({
        text,
        selection: { start: text.length, end: text.length },
      }),
  };
}
