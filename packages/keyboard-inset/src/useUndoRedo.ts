import { useCallback, useState } from 'react';

export type UndoRedoState<T> = {
  past: T[];
  present: T;
  future: T[];
};

export function useUndoRedo<T> (initialState: T) {
  const [state, setState] = useState<UndoRedoState<T>> ({
    past: [],
    present: initialState,
    future: [],
  });
  
  const set = useCallback ((next: T) => {
    setState (prev => {
      if (Object.is (prev.present, next)) return prev;
      
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: [],
      };
    });
  }, []);
  
  const undo = useCallback (() => {
    setState (prev => {
      if (!prev.past.length) return prev;
      const previous = prev.past[prev.past.length - 1];
      return {
        past: prev.past.slice(0, -1),
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);
  
  const redo = useCallback (() => {
    setState (prev => {
      if (!prev.future.length) return prev;
      const next = prev.future[0];
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: prev.future.slice(1),
      };
    });
  }, []);
  
  const reset = useCallback ((next: T) => {
    setState({ past: [], present: next, future: [] });
  }, []);
  
  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    history: state,
  };
}
