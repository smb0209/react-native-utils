import { useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';

const { KeepAwake } = NativeModules;

/**
 * 화면 단위 KeepAwake 제어 hook
 *
 * @param enabled true면 화면 꺼짐 방지
 */
export const useKeepAwake = (enabled: boolean = true) => {
  useEffect(() => {
    if (!KeepAwake?.setKeepAwake) {
      return;
    }
    
    // activate
    KeepAwake.setKeepAwake(enabled);
    
    // cleanup
    return () => {
      KeepAwake.setKeepAwake(false);
    };
  }, [enabled]);
};
