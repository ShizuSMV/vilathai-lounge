// TEST_MODE = true  → timer 3s, étapes 4s, fin 25s (pour tester)
// TEST_MODE = false → vraies dates du 20 juin 2026
export const TEST_MODE   = true
export const EVENT_DATE  = TEST_MODE
  ? new Date(Date.now() + 3000)
  : new Date('2026-06-20T19:00:00')

const OFFSET_UNIT        = TEST_MODE ? 1000    : 60000   // ms par unité
export const STEP_OFFSETS = TEST_MODE ? [0, 4, 8, 12, 16] : [0, 60, 150, 210, 300]
const END_OFFSET         = TEST_MODE ? 25      : 330

export const END_TIME    = new Date(EVENT_DATE.getTime() + END_OFFSET * OFFSET_UNIT)
export { OFFSET_UNIT }
