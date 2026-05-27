'use client'

import { TIMEZONE_COOKIE } from '@/lib/date'
import { useEffect } from 'react'

/**
 * Invisible client component.
 *
 * On mount it reads the browser's IANA timezone and stores it in a cookie so
 * that Server Components can use it for timezone-aware date calculations
 * (e.g. querying food logs for "today" in the user's local time).
 *
 * The cookie is refreshed on every page load so it stays in sync if the user
 * travels or changes their system settings.
 */
export function TimezoneSync() {
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    document.cookie = [
      `${TIMEZONE_COOKIE}=${encodeURIComponent(timezone)}`,
      'path=/',
      'max-age=31536000', // 1 year
      'SameSite=Lax',
    ].join('; ')
  }, [])

  return null
}
