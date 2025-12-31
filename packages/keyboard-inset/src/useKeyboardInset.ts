import { useEffect, useRef, useState, useCallback } from 'react';
import { Keyboard, Platform } from 'react-native';

type OverlayId = number;

export function useKeyboardInset () {
  const keyboardHeightRef = useRef(0);
  const overlayHeightsRef = useRef<Map<OverlayId, number>>(new Map());

  const [visible, setVisible] = useState (false);
  const [, forceRender] = useState(0);
  
  useEffect (() => {
    const showSub = Keyboard.addListener ('keyboardDidShow', e => {
      keyboardHeightRef.current = e.endCoordinates.height;
      setVisible (true);
      forceRender(v => v + 1);
    });
    
    const hideSub = Keyboard.addListener ('keyboardDidHide', () => {
      keyboardHeightRef.current = 0;
      setVisible (false);
      forceRender(v => v + 1);
    });
    
    return () => {
      showSub.remove ();
      hideSub.remove ();
    };
  }, []);

  /**
   * 🔑 Overlay 등록 (Toolbar, Accessory 등)
   * mount 시 호출, unmount 시 자동 해제
   */
  const registerOverlay = useCallback((height: number) => {
    const id = Date.now() + Math.random();

    overlayHeightsRef.current.set(id, height);
    forceRender(v => v + 1);
  
    return () => {
      overlayHeightsRef.current.delete(id);
      forceRender(v => v + 1);
    };
  }, []);

  const keyboardHeight = keyboardHeightRef.current;
  
  const overlayHeight = Array.from(
    overlayHeightsRef.current.values()
  ).reduce((sum, h) => sum + h, 0);

  const keyboardInset =
    Platform.OS === 'android'
      ? keyboardHeight + overlayHeight
      : keyboardHeight;
  
  return {
    keyboardVisible: visible,
    keyboardInset,
    registerOverlay,
  };
}
