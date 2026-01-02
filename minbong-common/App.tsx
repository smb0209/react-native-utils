import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { initAmplitude, trackErrorEvent, trackEvent } from '@/utils/amplitude.ts';

import LoadingDots from '@/components/LoadingDots.tsx';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { migrate } from '@/db/migrations/create_tables_202512180001.ts';
import { incrementTotalLaunches } from '@/services/appMetaService.ts';
import mobileAds from 'react-native-google-mobile-ads';
import { ProActionProvider } from '@/contexts/ProActionContext.tsx';

import { AppState, NativeModules } from 'react-native';

export default function App () {
  const [appReady, setAppReady] = useState (false);
  const [loading, setLoading] = useState (false);

  useEffect (() => {
    (async() => {
      try {
        // 1. Amplitude init
        await initAmplitude ();
        trackEvent ('Start Session');

        // 2. Error Handler
        setJSExceptionHandler ((error: unknown, isFatal: any) => {
          trackErrorEvent (isFatal ? 'Fatal Error' : 'Non-Fatal Error', error);
        }, true);

        // 3. AdMob init
        await mobileAds ().initialize ();
      } catch (e) {
        trackEvent ('Failed !!!! Start Session', { error: e });
      } finally {
        setAppReady (true);
      }
    }) ();
  }, []);
  useEffect (() => {
    incrementTotalLaunches ().then (() => {
    });
  }, []);

  useEffect (() => {
    (async() => {
      console.info ('migrations start');
      try {
        await migrate ();
        console.info ('migrations end');
      } catch (e) {
        console.error ('❌ migrate failed', e);
      }
    }) ();
  }, []);

  // example keepAwake
  const { KeepAwake } = NativeModules;
  useEffect (() => {
    const sub = AppState.addEventListener ('change', s => {
      if (s === 'active') {
        KeepAwake.setKeepAwake (isPlaying);
      }
    });
    return () => sub.remove ();
  }, []);

  return (
    <AppProviders>
      <View style={{ flex: 1 }}>
        {(loading || !appReady) && (
          <LoadingDots />
        )}
      </View>
    </AppProviders>
  );
}
