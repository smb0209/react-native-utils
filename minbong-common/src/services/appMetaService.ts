// src/services/appStatsService.ts
import { getMeta, setMeta } from '@/db/repositories/appMetaRepository';

const TOTAL_LAUNCHES_KEY = 'total_launches';
const PRO_EXPIRE = 'pro_expire';
const PRO_DURATION_MS = 12 * 60 * 60 * 1000;
const AD_COOLDOWN_UNTIL = 'ad_cooldown_until';

export async function incrementTotalLaunches(): Promise<number> {
  const raw = await getMeta(TOTAL_LAUNCHES_KEY);
  const next = (Number(raw ?? 0) || 0) + 1;

  await setMeta(TOTAL_LAUNCHES_KEY, String(next));
  return next;
}

export async function getTotalLaunches(): Promise<number> {
  const raw = await getMeta(TOTAL_LAUNCHES_KEY);
  return Number(raw ?? 0) || 0;
}

export async function getAppStats() {
  return {
    totalLaunches: await getTotalLaunches(),
  };
}

export async function setProUntil(timestamp: number) {
  await setMeta(PRO_EXPIRE, String(timestamp));
}

export async function getProUntil(): Promise<number | null> {
  const res = await getMeta(PRO_EXPIRE);

  if (!res) return null;
  return Number(res);
}

export async function grantProFor12Hours() {
  const expire = Date.now() + PRO_DURATION_MS;
  await setProUntil(expire);
  return expire;
}

export async function isProActive(): Promise<boolean> {
  const expire = await getProUntil();
  if (!expire) return false;
  return Date.now() < expire;
}

export async function setAdCoolDownUntil(timestamp: number) {
  await setMeta(AD_COOLDOWN_UNTIL, String(timestamp));
}

export async function getAdCoolDownUntil(): Promise<number | null> {
  const res = await getMeta(AD_COOLDOWN_UNTIL);

  if (!res) return null;
  return Number(res);
}
