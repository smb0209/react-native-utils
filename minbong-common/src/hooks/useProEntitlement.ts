import { useCallback, useEffect, useState } from 'react';
import { grantProFor12Hours, isProActive, getProUntil } from '@/services/appMetaService';

export function useProEntitlement () {
  const [isPro, setIsPro] = useState (false);
  const [proUntil, setProUntil] = useState<number | null> (null);
  
  const refresh = useCallback (async() => {
    const active = await isProActive ();
    const until = await getProUntil ();
    setIsPro (active);
    setProUntil (until);
  }, []);
  
  const grantFromAd = useCallback (async() => {
    const until = await grantProFor12Hours ();
    setIsPro (true);
    setProUntil (until);
  }, []);
  
  useEffect (() => {
    refresh ();
  }, [refresh]);
  
  return {
    isPro,
    proUntil,
    refresh,
    grantFromAd,
  };
}
