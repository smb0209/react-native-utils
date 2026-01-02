import React, { createContext, useContext, useRef, useState } from 'react';
import { canShowRewardedAd } from '@/utils/adGuard';
import { useRewardedAd } from '@/hooks/useRewardedAd';
import { grantProFor12Hours, isProActive, setProUntil } from '@/services/appMetaService';

type ProAction = () => Promise<void> | void;

interface ProActionContextType {
  runProAction: (action: ProAction) => Promise<void>;
  isConfirmVisible: boolean;
  confirm: () => void;
  cancel: () => void;
  isPro: boolean;
}

const ProActionContext = createContext<ProActionContextType | null> (null);

export function ProActionProvider ({ children }: { children: React.ReactNode }) {
  const pendingActionRef = useRef<ProAction | null> (null);
  const [isConfirmVisible, setConfirmVisible] = useState (false);
  const [isPro, setIsPro] = useState (false);
  
  const { showRewardedAd } = useRewardedAd ({
    onEarnedReward: async() => {
      await grantProFor12Hours()
      pendingActionRef.current?. ();
      pendingActionRef.current = null;
    },
  });
  
  const runProAction = async(action: ProAction) => {
    const currIsPro = await isProActive ();
    setIsPro(currIsPro)
    if (currIsPro) {
      action ();
      return;
    }
    
    const canShow = await canShowRewardedAd ();
    if ( !canShow) return;
    
    pendingActionRef.current = action;
    setConfirmVisible (true);
  };
  
  const confirm = () => {
    setConfirmVisible (false);
    
    // requestAnimationFrame(() => {
    //   showRewardedAd();
    // });
    setTimeout (() => {
      showRewardedAd ();
    }, 500);
  };
  
  const cancel = () => {
    setConfirmVisible (false);
    pendingActionRef.current = null;
  };
  
  return (
    <ProActionContext.Provider
      value={{
        runProAction,
        isConfirmVisible,
        confirm,
        cancel,
        isPro,
      }}
    >
      {children}
    </ProActionContext.Provider>
  );
}

export function useProAction () {
  const ctx = useContext (ProActionContext);
  if ( !ctx) {
    throw new Error ('useProAction must be used within ProActionProvider');
  }
  return ctx;
}
