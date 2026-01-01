import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useKeyboardInset } from '@minbong/keyboard-inset';

type UndoRedoToolbarProps = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

const UndoRedoToolbar: React.FC<UndoRedoToolbarProps> = ({
                                                           canUndo,
                                                           canRedo,
                                                           onUndo,
                                                           onRedo,
                                                         }) => {
  const { keyboardInset, keyboardVisible, registerOverlay } = useKeyboardInset ();

  useEffect (() => {
    return registerOverlay (44);
  }, [registerOverlay]);

  return (
    <View
      style={[
        styles.container,
        {
          bottom: keyboardInset,
          opacity: keyboardVisible ? 1 : 0,
          pointerEvents: keyboardVisible ? 'auto' : 'none',
        },
      ]}
    >
      <Pressable
        onPress={onUndo}
        disabled={ !canUndo}
        style={[styles.button, !canUndo && styles.disabled]}
      >
        <Text style={styles.text}>↺ Undo</Text>
      </Pressable>

      <Pressable
        onPress={onRedo}
        disabled={ !canRedo}
        style={[styles.button, !canRedo && styles.disabled]}
      >
        <Text style={styles.text}>↻ Redo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cfcfcf',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  disabled: {
    backgroundColor: '#eee',
  },
});

export default UndoRedoToolbar;
