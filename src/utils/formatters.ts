/**
 * Transfer milliseconds to visible duration
 *
 * 1000 -> 0h 0m 1s
 * */
export function parseMsToVisibleText(ms: number): string {
  if (ms < 1000) return 'less than 1s';
  let seconds: number | string = Math.trunc((ms / 1000) % 60);
  let minutes: number | string = Math.trunc((ms / (1000 * 60)) % 60);
  let hours: number | string = Math.trunc((ms / (1000 * 60 * 60)) % 24);
  seconds = seconds > 0 ? `${seconds}s` : '';
  minutes = minutes > 0 ? `${minutes}m ` : '';
  hours = hours > 0 ? `${hours}h ` : '';
  return `${hours}${minutes}${seconds}`;
}
