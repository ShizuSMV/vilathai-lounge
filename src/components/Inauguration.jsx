import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Inauguration.scss'

const STEPS = ['s1', 's2', 's3', 's4', 's5']
const EVENT_DATE = new Date('2026-06-20T19:00:00')

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false })

  useEffect(() => {
    const tick = () => {
      const diff = EVENT_DATE - new Date()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        done: false,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

export default function Inauguration() {
  const { t } = useTranslation()
  const { days, hours, minutes, seconds, done } = useCountdown()

  return (
    <section id="evenement" className="inauguration">
      <div className="inauguration__inner">

        <p className="inauguration__tag">{t('inauguration.tag')}</p>
        <h2 className="inauguration__title">{t('inauguration.title')}</h2>
        <p className="inauguration__subtitle">{t('inauguration.subtitle')}</p>

        <div className="inauguration__badge">
          <span className="inauguration__badge-date">{t('inauguration.date')}</span>
          <span className="inauguration__badge-time">{t('inauguration.time')}</span>
        </div>

        {!done && (
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
                  <span className="inauguration__countdown-num">
                    {String(val).padStart(2, '0')}
                  </span>
                  <span className="inauguration__countdown-text">{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="inauguration__program">
          <p className="inauguration__program-title">{t('inauguration.program')}</p>
          <ul className="inauguration__timeline">
            {STEPS.map(s => (
              <li key={s} className="inauguration__step">
                <span className="inauguration__step-time">{t(`inauguration.${s}_time`)}</span>
                <div className="inauguration__step-dot" />
                <div className="inauguration__step-content">
                  <strong>{t(`inauguration.${s}_label`)}</strong>
                  <span>{t(`inauguration.${s}_desc`)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <a href="#reservation" className="inauguration__cta">{t('inauguration.cta')}</a>

      </div>
    </section>
  )
}
