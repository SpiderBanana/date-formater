import { LocalizedDateComponents } from './localizer';

export function formatTemplate(
  template: string,
  components: LocalizedDateComponents,
  date: Date,
): string {
  const tokens: { [key: string]: string } = {
    // Day tokens
    DD: components.day,
    D: components.dayNumber.toString(),
    dddd: components.weekday,
    ddd: components.weekdayShort,
    dd: components.weekdayShort.substring(0, 2),
    d: date.getDay().toString(),

    // Month tokens
    MMMM: components.monthName,
    MMM: components.monthNameShort,
    MM: components.month,
    M: components.monthNumber.toString(),

    // Year tokens
    YYYY: components.year,
    YY: components.year.slice(-2),

    // Hour tokens (24-hour)
    HH: date.getHours().toString().padStart(2, '0'),
    H: date.getHours().toString(),

    // Hour tokens (12-hour)
    hh: (date.getHours() % 12 || 12).toString().padStart(2, '0'),
    h: (date.getHours() % 12 || 12).toString(),

    // Minute tokens
    mm: date.getMinutes().toString().padStart(2, '0'),
    m: date.getMinutes().toString(),

    // Second tokens
    ss: date.getSeconds().toString().padStart(2, '0'),
    s: date.getSeconds().toString(),

    // Millisecond tokens
    SSS: date.getMilliseconds().toString().padStart(3, '0'),
    SS: Math.floor(date.getMilliseconds() / 10)
      .toString()
      .padStart(2, '0'),
    S: Math.floor(date.getMilliseconds() / 100).toString(),

    // AM/PM tokens
    A: date.getHours() >= 12 ? 'PM' : 'AM',
    a: date.getHours() >= 12 ? 'pm' : 'am',

    // Unix timestamp
    X: Math.floor(date.getTime() / 1000).toString(),
    x: date.getTime().toString(),
  }; // First, create a map of replacements with unique delimiters
  const replacements: Array<{ pattern: string; replacement: string }> = [];

  // Sort by length to handle longer patterns first
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);

  for (const token of sortedTokens) {
    if (tokens[token] !== undefined && template.includes(token)) {
      replacements.push({
        pattern: token,
        replacement: tokens[token],
      });
    }
  }

  // Apply replacements one by one using a unique placeholder approach
  let result = template;
  const placeholderMap = new Map<string, string>();

  for (let i = 0; i < replacements.length; i++) {
    const { pattern, replacement } = replacements[i];
    const placeholder = `__TEMP_PLACEHOLDER_${i}__`;
    placeholderMap.set(placeholder, replacement);
    result = result.split(pattern).join(placeholder);
  }

  // Replace all placeholders with actual values
  for (const [placeholder, replacement] of placeholderMap) {
    result = result.split(placeholder).join(replacement);
  }

  return result;
}

export function getAvailableTokens(): {
  [category: string]: { [token: string]: string };
} {
  return {
    day: {
      DD: 'Day of month, 2 digits with leading zeros (01 to 31)',
      D: 'Day of month (1 to 31)',
      dddd: 'Full day name (Monday)',
      ddd: 'Short day name (Mon)',
      dd: 'Min day name (Mo)',
      d: 'Day of week (0 Sunday, 6 Saturday)',
    },
    month: {
      MMMM: 'Full month name (January)',
      MMM: 'Short month name (Jan)',
      MM: 'Month number, 2 digits (01 to 12)',
      M: 'Month number (1 to 12)',
    },
    year: {
      YYYY: 'Full year (2021)',
      YY: 'Two digit year (21)',
    },
    hour: {
      HH: 'Hour, 24-hour format, 2 digits (00 to 23)',
      H: 'Hour, 24-hour format (0 to 23)',
      hh: 'Hour, 12-hour format, 2 digits (01 to 12)',
      h: 'Hour, 12-hour format (1 to 12)',
    },
    minute: {
      mm: 'Minutes, 2 digits (00 to 59)',
      m: 'Minutes (0 to 59)',
    },
    second: {
      ss: 'Seconds, 2 digits (00 to 59)',
      s: 'Seconds (0 to 59)',
    },
    millisecond: {
      SSS: 'Milliseconds, 3 digits (000 to 999)',
      SS: 'Milliseconds, 2 digits (00 to 99)',
      S: 'Milliseconds, 1 digit (0 to 9)',
    },
    meridiem: {
      A: 'AM/PM',
      a: 'am/pm',
    },
    timestamp: {
      X: 'Unix timestamp in seconds',
      x: 'Unix timestamp in milliseconds',
    },
  };
}
