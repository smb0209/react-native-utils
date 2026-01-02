import { getAdCoolDownUntil, getProUntil, setAdCoolDownUntil } from '@/services/appMetaService';

export async function canShowRewardedAd (): Promise<boolean> {
  const now = Date.now ();

  const proUntil = await getProUntil ();
  if (proUntil && now < Number (proUntil)) {
    return false;
  }

  const cooldownUntil = await getAdCoolDownUntil ();
  if (cooldownUntil && now < Number (cooldownUntil)) {
    return false;
  }

  return true;
}

export async function setAdCooldown (ms: number) {
  const until = Date.now () + ms;
  await setAdCoolDownUntil (until);
}
