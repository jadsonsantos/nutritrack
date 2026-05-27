/**
 * Returns the UTC Date objects that mark the start (today) and end (tomorrow)
 * of the **current day** in the given IANA timezone.
 *
 * Falls back to 'America/Sao_Paulo' when the timezone is missing or invalid,
 * since the app targets Brazilian users.
 *
 * How it works:
 *   1. Ask Intl how many hours/minutes/seconds have elapsed since midnight in
 *      the target timezone.
 *   2. Subtract that elapsed time from `now` to get the UTC instant that
 *      corresponds to local midnight.
 *   3. Add 24 h to get the start of tomorrow.
 */
export function getDayRange(timezone?: string): {
  today: Date
  tomorrow: Date
} {
  const FALLBACK = 'America/Sao_Paulo'

  let tz = timezone ?? FALLBACK
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz })
  } catch {
    tz = FALLBACK
  }

  const now = new Date()

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? '0', 10)

  // `hour12: false` can return '24' for midnight — normalise with % 24
  const elapsedMs =
    (get('hour') % 24) * 3_600_000 +
    get('minute') * 60_000 +
    get('second') * 1_000 +
    now.getMilliseconds()

  const today = new Date(now.getTime() - elapsedMs)
  const tomorrow = new Date(today.getTime() + 86_400_000)

  return { today, tomorrow }
}

export const TIMEZONE_COOKIE = 'user-timezone'
