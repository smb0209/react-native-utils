import { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProActionProvider } from './pro/ProActionContext';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ProActionProvider>
          {children}
        </ProActionProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
