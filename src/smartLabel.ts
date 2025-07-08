const SMART_LABELS: { [locale: string]: { [key: string]: string } } = {
  'fr-FR': {
    today: "Aujourd'hui",
    yesterday: 'Hier',
    tomorrow: 'Demain',
    thisWeek: 'Cette semaine',
    lastWeek: 'La semaine dernière',
    nextWeek: 'La semaine prochaine',
    thisMonth: 'Ce mois-ci',
    lastMonth: 'Le mois dernier',
    nextMonth: 'Le mois prochain'
  },
  'en-US': {
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    thisWeek: 'This week',
    lastWeek: 'Last week',
    nextWeek: 'Next week',
    thisMonth: 'This month',
    lastMonth: 'Last month',
    nextMonth: 'Next month'
  },
  'es-ES': {
    today: 'Hoy',
    yesterday: 'Ayer',
    tomorrow: 'Mañana',
    thisWeek: 'Esta semana',
    lastWeek: 'La semana pasada',
    nextWeek: 'La próxima semana',
    thisMonth: 'Este mes',
    lastMonth: 'El mes pasado',
    nextMonth: 'El próximo mes'
  },
  'de-DE': {
    today: 'Heute',
    yesterday: 'Gestern',
    tomorrow: 'Morgen',
    thisWeek: 'Diese Woche',
    lastWeek: 'Letzte Woche',
    nextWeek: 'Nächste Woche',
    thisMonth: 'Diesen Monat',
    lastMonth: 'Letzten Monat',
    nextMonth: 'Nächsten Monat'
  }
};

export function getSmartLabel(date: Date, locale: string = 'fr-FR'): string | null {
  const now = new Date();
  const targetDate = new Date(date);
  
  // Reset time to compare only dates
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const compareDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  
  const diffTime = compareDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  const labels = SMART_LABELS[locale] || SMART_LABELS['fr-FR'];
  
  // Exact day matches
  if (diffDays === 0) return labels.today;
  if (diffDays === -1) return labels.yesterday;
  if (diffDays === 1) return labels.tomorrow;
  
  // Week comparisons
  const todayWeekStart = getWeekStart(today);
  const targetWeekStart = getWeekStart(compareDate);
  const weekDiff = Math.round((targetWeekStart.getTime() - todayWeekStart.getTime()) / (1000 * 60 * 60 * 24 * 7));
  
  if (weekDiff === 0 && Math.abs(diffDays) <= 6) return labels.thisWeek;
  if (weekDiff === -1) return labels.lastWeek;
  if (weekDiff === 1) return labels.nextWeek;
  
  // Month comparisons
  const monthDiff = (targetDate.getFullYear() - now.getFullYear()) * 12 + (targetDate.getMonth() - now.getMonth());
  
  if (monthDiff === 0) return labels.thisMonth;
  if (monthDiff === -1) return labels.lastMonth;
  if (monthDiff === 1) return labels.nextMonth;
  
  return null;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
}

export function getAllSmartLabels(locale: string = 'fr-FR'): { [key: string]: string } {
  return SMART_LABELS[locale] || SMART_LABELS['fr-FR'];
}

export function getSupportedLocales(): string[] {
  return Object.keys(SMART_LABELS);
}