export function parseDate(input: string | Date | number): Date {
  if (input instanceof Date) {
    if (isNaN(input.getTime())) {
      throw new Error('Invalid Date object provided');
    }
    return new Date(input);
  }
  
  if (typeof input === 'number') {
    const date = new Date(input);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid timestamp provided');
    }
    return date;
  }
  
  if (typeof input === 'string') {
    // Handle common date formats
    const trimmedInput = input.trim();
    
    // ISO format
    if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/.test(trimmedInput)) {
      const date = new Date(trimmedInput);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    
    // DD/MM/YYYY format
    const ddmmyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmedInput);
    if (ddmmyyyy) {
      const [, day, month, year] = ddmmyyyy;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    
    // MM/DD/YYYY format
    const mmddyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmedInput);
    if (mmddyyyy) {
      const [, month, day, year] = mmddyyyy;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    
    // Try native Date parsing as fallback
    const date = new Date(trimmedInput);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    throw new Error(`Unable to parse date string: ${input}`);
  }
  
  throw new Error(`Unsupported input type: ${typeof input}`);
}