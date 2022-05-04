export function parseMsToVisibleText(ms: number): string {
  if (ms < 1000) return 'less than 1 second';
  let seconds: number | string = Math.trunc((ms / 1000) % 60);
  let minutes: number | string = Math.trunc((ms / (1000 * 60)) % 60);
  let hours: number | string = Math.trunc((ms / (1000 * 60 * 60)) % 24);
  let isSecondSingle = seconds === 1;
  let isMinuteSingle = minutes === 1;
  let isHourSingle = hours === 1;
  seconds = seconds > 0 ? `${seconds} second${isSecondSingle ? '' : 's'}` : '';
  minutes = minutes > 0 ? `${minutes} minute${isMinuteSingle ? '' : 's'}` : '';
  hours = hours > 0 ? `${hours} hour${isHourSingle ? '' : 's'}` : '';
  return `${hours}${minutes}${seconds}`;
}
