export const ROLES = {
  NUTRITIONIST: 'NUTRITIONIST',
  PATIENT: 'PATIENT',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]
