import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Reservation.scss'

const ZENCHEF_RID       = '371140'
const EVENT_NIGHT_START = new Date('2026-06-20T19:00:00')
const EVENT_NIGHT_END   = new Date('2026-06-21T00:30:00')

export default function Reservation() {
  const { t }        = useTranslation()
  const now          = new Date()
  const isEventNight = now >= EVENT_NIGHT_START && now <= EVENT_NIGHT_END

  useEffect(() => {
    if (isEventNight) return

    // Supprimer l'ancien script s'il existe (évite les doublons au HMR)
    const old = document.getElementById('zenchef-sdk')
    if (old) old.remove()

    // Charger le script APRÈS que le div est dans le DOM
    const script = document.createElement('script')
    script.id    = 'zenchef-sdk'
    script.async = true
    script.src   = 'https://sdk.zenchef.com/v1/sdk.min.js'
    document.body.appendChild(script)

    return () => {
      const el = document.getElementById('zenchef-sdk')
      if (el) el.remove()
    }
  }, [isEventNight])

  return (
    <section id="reservation" className="resv">
      <div className="resv__container">

        {isEventNight ? (
          <div className="resv__closed">
            <p className="resv__closed-icon">✦</p>
            <p className="resv__closed-title">{t('reservation.closed_tonight_title')}</p>
            <p className="resv__closed-msg">{t('reservation.closed_tonight_msg')}</p>
          </div>
        ) : (
          <>
            <div className="resv__header">
              <span className="resv__tag">{t('reservation.tag')}</span>
              <h2 className="resv__title">{t('reservation.title')}</h2>
              <div className="resv__divider" />
              <p className="resv__subtitle">{t('reservation.subtitle')}</p>
            </div>
            <div className="resv__widget">
              <div
                className="zc-widget-config"
                data-restaurant={ZENCHEF_RID}
                data-open="2000"
              />
            </div>
          </>
        )}

      </div>
    </section>
  )
}
