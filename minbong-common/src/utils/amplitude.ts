import * as amplitude from '@amplitude/analytics-react-native';
import { ENV } from '@/config/env';

let initialized = false;

export const initAmplitude = async () => {
  if (initialized) {
    return;
  }

  await amplitude.init(ENV.amplitudeKey, undefined, {disableCookies: true}).promise;

  initialized = true;
};

export const trackEvent = async (eventName: string, eventProps?: Record<string, any>) => {
  try {
    if (!initialized) {
      await initAmplitude(); // 초기화 안됐으면 먼저 초기화
    }
    // if (!initialized) {
    //   console.warn(`Amplitude not initialized yet. Tried to track: ${eventName}`);
    //   return;
    // }
    amplitude.track(eventName, eventProps);
  } catch (e) {
    console.error(e)
  }
};

export const setUserId = (userId: string) => {
  if (!initialized) {
    return;
  }
  amplitude.setUserId(userId);
};
export function trackErrorEvent(name: string, error: unknown) {
  trackEvent(name, {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : '',
  });
}
