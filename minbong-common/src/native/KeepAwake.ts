import { NativeModules } from 'react-native';

const { KeepAwake } = NativeModules;

export function enableKeepAwake() {
  KeepAwake?.setKeepAwake(true);
}

export function disableKeepAwake() {
  KeepAwake?.setKeepAwake(false);
}
