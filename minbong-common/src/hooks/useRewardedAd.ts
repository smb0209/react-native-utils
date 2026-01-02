import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { ENV } from '@/config/env';
import { setAdCooldown } from '@/utils/adGuard';

type UseRewardedAdOptions = {
  onEarnedReward?: (reward: any) => void;
};

export function useRewardedAd (options?: UseRewardedAdOptions) {
  const rewardedRef = useRef<RewardedAd | null> (null);
  const hasEarnedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState (false);

  const adUnitId = __DEV__
    ? TestIds.REWARDED
    : Platform.OS === 'ios'
      ? ENV.googleAdmobIosRewardedUnitId
      : ENV.googleAdmobAndroidRewardedUnitId;

  useEffect (() => {
    let unsubscribeFns: (() => void)[] = [];

    const loadAd = () => {

      // 기존 광고 인스턴스 정리
      unsubscribeFns.forEach (unsub => unsub ());
      unsubscribeFns = [];
      rewardedRef.current = null;
      setIsLoaded (false);

      const ad = RewardedAd.createForAdRequest (adUnitId);
      rewardedRef.current = ad;

      unsubscribeFns.push (
        ad.addAdEventListener (RewardedAdEventType.LOADED, () => {
          setIsLoaded (true);
        }),
      );

      unsubscribeFns.push (
        ad.addAdEventListener (
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            hasEarnedRef.current = true;
            options?.onEarnedReward?. (reward);
          },
        ),
      );

      unsubscribeFns.push (
        ad.addAdEventListener (AdEventType.CLOSED, async() => {
          if (hasEarnedRef.current) {
            hasEarnedRef.current = false;
          } else {
            setIsLoaded (false);
          }

          // 광고 연속 시청 방지
          await setAdCooldown (60 * 1000);

          // 다음 광고 준비
          loadAd ();
        }),
      );

      unsubscribeFns.push(
        ad.addAdEventListener(AdEventType.ERROR, error => {
          console.error('[RewardedAd] ERROR', error);
        }),
      );

      ad.load ();
    };

    const init = async() => {
      // ATT (iOS)
      if (Platform.OS === 'ios' && ENV.enableATT) {
        const status = await check (
          PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
        );
        if (status === RESULTS.DENIED) {
          await request (
            PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
          );
        }
      }

      loadAd ();
    };

    init ();

    return () => {
      unsubscribeFns.forEach (unsub => unsub ());
      rewardedRef.current = null;
    };
  }, [adUnitId]);

  const showRewardedAd = () => {
    const ad = rewardedRef.current;

    if ( !ad || !isLoaded) {
      console.warn ('[RewardedAd] not ready');
      return false;
    }

    try {
      setIsLoaded (false);
      hasEarnedRef.current = false;

      ad.show ();
      return true;
    } catch (e) {
      console.error ('[RewardedAd] show error', e);
      return false;
    }
  };

  return {
    isLoaded,
    showRewardedAd,
  };
}
