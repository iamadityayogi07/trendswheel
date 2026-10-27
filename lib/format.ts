const IST = 'Asia/Kolkata';

/** "MARCH 3, 2026" - same style as the old site, computed in the old app timezone. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: IST, year: 'numeric', month: 'long', day: 'numeric' })
    .format(new Date(iso))
    .toUpperCase();
}

export const sameDay = (a: string, b: string) => {
  const f = (s: string) => new Intl.DateTimeFormat('en-CA', { timeZone: IST }).format(new Date(s));
  return f(a) === f(b);
};
