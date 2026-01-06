import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

export const usePortraitOnly = () => {
  useEffect (() => {
    Orientation.lockToPortrait ();
  }, []);
};

export const useUnlockAllOrientations = () => {
  useEffect (() => {
    Orientation.unlockAllOrientations ();
    return () => {
      Orientation.lockToPortrait ();
    };
  }, []);
};
