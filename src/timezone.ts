export function handleTimezone(date: Date, timezone: string = 'Europe/Paris'): Date {
  try {
    // Create a new date in the specified timezone
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(date);
    const partMap: { [key: string]: string } = {};
    
    parts.forEach(part => {
      partMap[part.type] = part.value;
    });
    
    // Construct the date in the target timezone
    const timezoneDate = new Date(
      parseInt(partMap.year),
      parseInt(partMap.month) - 1,
      parseInt(partMap.day),
      parseInt(partMap.hour),
      parseInt(partMap.minute),
      parseInt(partMap.second)
    );
    
    return timezoneDate;
  } catch (error) {
    // If timezone is invalid, return original date
    console.warn(`Invalid timezone "${timezone}", using original date`);
    return new Date(date);
  }
}

export function getTimezoneOffset(timezone: string): number {
  try {
    const now = new Date();
    const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timezone }));
    return (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60);
  } catch {
    return 0;
  }
}