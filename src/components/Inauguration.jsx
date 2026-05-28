import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Inauguration.scss'

// TEST : timer 3s, étapes toutes les 4s, fin à 25s
// PROD  : EVENT_DATE = new Date('2026-06-20T19:00:00'), STEP_OFFSETS en minutes, END_OFFSET = 330
const TEST_MODE    = true
const EVENT_DATE   = new Date(Date.now() + 3000)
const STEP_OFFSETS = TEST_MODE ? [0, 4, 8, 12, 16]   : [0, 60, 150, 210, 300]
const END_OFFSET   = TEST_MODE ? 25                   : 330
const OFFSET_UNIT  = TEST_MODE ? 1000 : 60000  // ms par unité (secondes vs minutes)

const STEPS = ['s1', 's2', 's3', 's4', 's5']

const STEP_TIMES = STEPS.map((key, i) => ({
  key,
  time: new Date(EVENT_DATE.getTime() + STEP_OFFSETS[i] * OFFSET_UNIT),
}))
const END_TIME = new Date(EVENT_DATE.getTime() + END_OFFSET * OFFSET_UNIT)

function useCountdown() {
  const [state, setState] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false })
  useEffect(() => {
    const tick = () => {
      const diff = EVENT_DATE - new Date()
      if (diff <= 0) { setState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true }); return }
      setState({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        done: false,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return state
}

function useNow() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), TEST_MODE ? 500 : 15000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Inauguration() {
  const { t }                                    = useTranslation()
  const { days, hours, minutes, seconds, done }  = useCountdown()
  const now                                      = useNow()
  const [revealed, setRevealed]                  = useState(false)

  useEffect(() => {
    if (done && !revealed) setRevealed(true)
  }, [done, revealed])

  // Section disparaît après END_TIME
  if (now >= END_TIME) return null

  // Étapes actives (l'heure est passée)
  const activeKeys = new Set(STEP_TIMES.filter(s => now >= s.time).map(s => s.key))
  // Étape en cours (la plus récente activée)
  const currentKey = [...STEP_TIMES].reverse().find(s => now >= s.time)?.key

  return (
    <section id="evenement" className={`inauguration${revealed ? ' inauguration--revealed' : ''}`}>
      <div className="inauguration__inner">

        <p className="inauguration__tag">{t('inauguration.tag')}</p>

        <div className="inauguration__badge">
          <span className="inauguration__badge-date">{t('inauguration.date')}</span>
          <span className="inauguration__badge-time">{t('inauguration.time')}</span>
        </div>

        <h2 className="inauguration__title">{t('inauguration.title')}</h2>

        <div className="inauguration__subtitle-wrap">
          <p className={`inauguration__sub inauguration__sub--before${revealed ? ' inauguration__sub--out' : ''}`}>
            {t('inauguration.subtitle')}
          </p>
          <p className={`inauguration__sub inauguration__sub--after${revealed ? ' inauguration__sub--in' : ''}`}>
            Vila&nbsp;Thaï <span>Lounge</span>
          </p>
        </div>

        {!revealed && (
          <div className="inauguration__countdown">
            <p className="inauguration__countdown-label">{t('inauguration.countdown_title')}</p>
            <div className="inauguration__countdown-grid">
              {[
                [days,    t('inauguration.days')],
                [hours,   t('inauguration.hours')],
                [minutes, t('inauguration.minutes')],
                [seconds, t('inauguration.seconds')],
              ].map(([val, lbl]) => (
                <div key={lbl} className="inauguration__countdown-unit">
                  <span className="inauguration__countdown-num">{String(val).padStart(2, '0')}</span>
                  <span className="inauguration__countdown-text">{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {revealed && (
          <p className="inauguration__reveal-msg">L'heure est venue ✦</p>
        )}

        <div className="inauguration__program">
          <p className="inauguration__program-title">{t('inauguration.program')}</p>
          <ul className="inauguration__timeline">
            {STEPS.map(s => {
              const isActive  = activeKeys.has(s)
              const isCurrent = currentKey === s
              const cls = [
                'inauguration__step',
                isActive  ? 'inauguration__step--active'  : '',
                isCurrent ? 'inauguration__step--current' : '',
              ].filter(Boolean).join(' ')
              return (
                <li key={s} className={cls}>
                  <span className="inauguration__step-time">{t(`inauguration.${s}_time`)}</span>
                  <div className="inauguration__step-dot" />
                  <div className="inauguration__step-content">
                    <strong>{t(`inauguration.${s}_label`)}</strong>
                    <span>{t(`inauguration.${s}_desc`)}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {!revealed && (
          <a href="#reservation" className="inauguration__cta">{t('inauguration.cta')}</a>
        )}

      </div>
    </section>
  )
}
