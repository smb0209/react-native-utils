declare module 'react-native-exception-handler' {
  export function setJSExceptionHandler(
    handler: (error: unknown, isFatal: boolean) => void,
    allowInDevMode?: boolean
  ): void;
}
