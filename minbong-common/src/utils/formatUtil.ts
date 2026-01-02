export function formatDate(
  dateInput?: string | Date | number,
  locale: string = 'ko-KR',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
): string {
  if (!dateInput) {
    return '-';
  }
  try {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) {
      return '';
    }
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (e) {
    console.warn('Invalid date:', e);
    return '';
  }
}

export function countWords(
  txt?: string | null
): number {
  if (!txt) {
    return 0;
  }
  try {
    return txt.trim().split(/\s+/).length;
  } catch (e) {
    return 0;
  }
}

export function countCharacters(
  txt?: string | null
): number {
  if (!txt) {
    return 0;
  }
  try {
    return txt.length;
  } catch (e) {
    return 0;
  }
}
