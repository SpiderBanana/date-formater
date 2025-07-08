export interface LocalizedDateComponents {
  day: string;
  month: string;
  year: string;
  weekday: string;
  monthName: string;
  monthNameShort: string;
  weekdayShort: string;
  dayNumber: number;
  monthNumber: number;
  yearNumber: number;
}

export function localizeDate(
  date: Date,
  locale: string = 'fr-FR',
): LocalizedDateComponents {
  const dayNumber = date.getDate();
  const monthNumber = date.getMonth() + 1;
  const yearNumber = date.getFullYear();

  // Use Intl.DateTimeFormat for proper localization
  const dayFormatter = new Intl.DateTimeFormat(locale, { day: '2-digit' });
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: '2-digit' });
  const yearFormatter = new Intl.DateTimeFormat(locale, { year: 'numeric' });
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  const weekdayShortFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  });
  const monthNameFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });
  const monthNameShortFormatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
  });

  return {
    day: dayFormatter.format(date),
    month: monthFormatter.format(date),
    year: yearFormatter.format(date),
    weekday: weekdayFormatter.format(date),
    monthName: monthNameFormatter.format(date),
    monthNameShort: monthNameShortFormatter.format(date),
    weekdayShort: weekdayShortFormatter.format(date),
    dayNumber,
    monthNumber,
    yearNumber,
  };
}

export function getLocalizedDayNames(locale: string = 'fr-FR'): string[] {
  const days: string[] = [];
  const baseDate = new Date(2021, 0, 4); // Monday, January 4, 2021

  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    days.push(
      new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date),
    );
  }

  return days;
}

export function getLocalizedMonthNames(locale: string = 'fr-FR'): string[] {
  const months: string[] = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(2021, i, 1);
    months.push(
      new Intl.DateTimeFormat(locale, { month: 'long' }).format(date),
    );
  }

  return months;
}
