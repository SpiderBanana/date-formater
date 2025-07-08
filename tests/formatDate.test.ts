import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  formatDate,
  parseDate,
  getSmartLabel,
  localizeDate,
  formatTemplate,
  handleTimezone,
} from '../src/index';

describe('formatDate', () => {
  const testDate = new Date(2024, 0, 15, 14, 30, 45); // 15 janvier 2024, 14:30:45

  it('should format date with default options', () => {
    const result = formatDate(testDate);
    expect(result).toBe('15/01/2024');
  });

  it('should format date with custom format', () => {
    const result = formatDate(testDate, {
      format: 'DD MMMM YYYY',
      locale: 'fr-FR',
    });
    expect(result).toBe('15 janvier 2024');
  });

  it('should format date with English locale', () => {
    const result = formatDate(testDate, {
      format: 'MMMM DD, YYYY',
      locale: 'en-US',
    });
    expect(result).toBe('January 15, 2024');
  });

  it('should show smart labels for today', () => {
    const today = new Date();
    const result = formatDate(today, { useSmartLabels: true });
    expect(result).toBe("Aujourd'hui");
  });

  it('should disable smart labels', () => {
    const today = new Date();
    const result = formatDate(today, {
      useSmartLabels: false,
      format: 'DD/MM/YYYY',
    });
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });
});

describe('parseDate', () => {
  it('should parse Date object', () => {
    const input = new Date(2024, 0, 15);
    const result = parseDate(input);
    expect(result).toEqual(input);
  });

  it('should parse timestamp', () => {
    const timestamp = 1705334400000; // 15 janvier 2024
    const result = parseDate(timestamp);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(15);
  });

  it('should parse ISO string', () => {
    const isoString = '2024-01-15T00:00:00.000Z';
    const result = parseDate(isoString);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(15);
  });

  it('should parse DD/MM/YYYY format', () => {
    const result = parseDate('15/01/2024');
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(15);
  });

  it('should throw error for invalid input', () => {
    expect(() => parseDate('invalid')).toThrow();
    expect(() => parseDate(NaN)).toThrow();
  });
});

describe('getSmartLabel', () => {
  it('should return "Aujourd\'hui" for today', () => {
    const today = new Date();
    const result = getSmartLabel(today, 'fr-FR');
    expect(result).toBe("Aujourd'hui");
  });

  it('should return "Hier" for yesterday', () => {
    const yesterday = new Date(Date.now() - 86400000);
    const result = getSmartLabel(yesterday, 'fr-FR');
    expect(result).toBe('Hier');
  });

  it('should return "Demain" for tomorrow', () => {
    const tomorrow = new Date(Date.now() + 86400000);
    const result = getSmartLabel(tomorrow, 'fr-FR');
    expect(result).toBe('Demain');
  });

  it('should return null for distant dates', () => {
    const distantDate = new Date(2020, 0, 15);
    const result = getSmartLabel(distantDate, 'fr-FR');
    expect(result).toBe(null);
  });
});

describe('localizeDate', () => {
  const testDate = new Date(2024, 0, 15, 14, 30, 45); // 15 janvier 2024

  it('should localize date in French', () => {
    const result = localizeDate(testDate, 'fr-FR');
    expect(result.monthName).toBe('janvier');
    expect(result.weekday).toBe('lundi');
    expect(result.day).toBe('15');
    expect(result.month).toBe('01');
    expect(result.year).toBe('2024');
  });

  it('should localize date in English', () => {
    const result = localizeDate(testDate, 'en-US');
    expect(result.monthName).toBe('January');
    expect(result.weekday).toBe('Monday');
  });
});

describe('formatTemplate', () => {
  const testDate = new Date(2024, 0, 15, 14, 30, 45, 123); // 15 janvier 2024, 14:30:45.123
  const components = localizeDate(testDate, 'fr-FR');

  it('should format basic date template', () => {
    const result = formatTemplate('DD/MM/YYYY', components, testDate);
    expect(result).toBe('15/01/2024');
  });

  it('should format time template', () => {
    const result = formatTemplate('HH:mm:ss', components, testDate);
    expect(result).toBe('14:30:45');
  });

  it('should format full datetime template', () => {
    const result = formatTemplate('DD MMMM YYYY à HH:mm', components, testDate);
    expect(result).toBe('15 janvier 2024 à 14:30');
  });

  it('should format 12-hour time with AM/PM', () => {
    const result = formatTemplate('h:mm A', components, testDate);
    expect(result).toBe('2:30 PM');
  });
});

describe('handleTimezone', () => {
  it('should handle timezone conversion', () => {
    const utcDate = new Date('2024-01-15T12:00:00Z');
    const result = handleTimezone(utcDate, 'Europe/Paris');
    // Should be 13:00 in Paris (UTC+1 in winter)
    expect(result.getHours()).toBe(13);
  });

  it('should handle invalid timezone gracefully', () => {
    const date = new Date('2024-01-15T12:00:00Z');
    const result = handleTimezone(date, 'Invalid/Timezone');
    expect(result).toEqual(date);
  });
});
