import { Lang } from '@/types/domain.ts';

export function getRemainingTime (ms: number) {
  if (ms <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  
  const totalSeconds = Math.floor (ms / 1000);
  
  const hours = Math.floor (totalSeconds / 3600);
  const minutes = Math.floor ((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return { hours, minutes, seconds };
}

export function formatRemainingTime (
  remainingMs: number,
  lang: Lang,
): string {
  if (remainingMs <= 0) {
    switch (lang) {
      case 'ko':
        return '만료됨';
      case 'ja':
        return '期限切れ';
      default:
        return 'Expired';
    }
  }
  if (remainingMs < 60 * 1000) {
    return lang === 'ko'
      ? '1분 미만'
      : lang === 'ja'
        ? '1分未満'
        : 'Less than 1 min';
  }
  
  const { hours, minutes } = getRemainingTime (remainingMs);
  
  switch (lang) {
    case 'ko':
      if (hours > 0) return `${hours}시간 ${minutes}분`;
      return `${minutes}분`;
    
    case 'ja':
      if (hours > 0) return `${hours}時間${minutes}分`;
      return `${minutes}分`;
    
    default: // en
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}m`;
  }
}
