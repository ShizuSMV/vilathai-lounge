// TEST_MODE = true  → timer 3s, étapes 4s, fin 25s (pour tester)
// TEST_MODE = false → vraies dates du 20 juin 2026
export const TEST_MODE   = false
export const EVENT_DATE  = new Date('2026-06-20T19:00:00')

export const STEP_OFFSETS = [0, 60, 150, 210, 300]  // minutes après EVENT_DATE
export const OFFSET_UNIT  = 60000                    // 1 minute en ms
const END_OFFSET          = 330                      // 00h30 le 21 juin

export const END_TIME    = new Date(EVENT_DATE.getTime() + END_OFFSET * OFFSET_UNIT)
