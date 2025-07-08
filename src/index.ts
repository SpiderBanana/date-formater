import { parseDate } from './parseDate';
import { handleTimezone } from './timezone';
import { getSmartLabel } from './smartLabel';
import { localizeDate } from './localizer';
import { formatTemplate } from './formatTemplate';

export interface FormatOptions {
  locale?: string;
  timezone?: string;
  format?: string;
  useSmartLabels?: boolean;
}

export function formatDate(
  input: string | Date | number,
  options: FormatOptions = {},
): string {
  const {
    locale = 'fr-FR',
    timezone = 'Europe/Paris',
    format = 'DD/MM/YYYY',
    useSmartLabels = true,
  } = options;

  // Parse the input date
  const parsedDate = parseDate(input);

  // Handle timezone conversion
  const timezoneDate = handleTimezone(parsedDate, timezone);

  // Check for smart labels first
  if (useSmartLabels) {
    const smartLabel = getSmartLabel(timezoneDate, locale);
    if (smartLabel) {
      return smartLabel;
    }
  }

  // Localize the date components
  const localizedComponents = localizeDate(timezoneDate, locale);

  // Format using template
  return formatTemplate(format, localizedComponents, timezoneDate);
}

// Re-export all functions for advanced usage
export { parseDate } from './parseDate';
export { handleTimezone, getTimezoneOffset } from './timezone';
export {
  getSmartLabel,
  getAllSmartLabels,
  getSupportedLocales,
} from './smartLabel';
export {
  localizeDate,
  getLocalizedDayNames,
  getLocalizedMonthNames,
} from './localizer';
export { formatTemplate, getAvailableTokens } from './formatTemplate';
export type { LocalizedDateComponents } from './localizer';
