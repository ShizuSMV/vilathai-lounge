import { useTranslation } from 'react-i18next'
import './Reservation.scss'

const ZENCHEF_RID       = '371140'
const EVENT_NIGHT_START = new Date('2026-06-20T19:00:00')
const EVENT_NIGHT_END   = new Date('2026-06-21T00:30:00')

export default function Reservation() {
  const { t }        = useTranslation()
  const now          = new Date()
  const isEventNight = now >= EVENT_NIGHT_START && now <= EVENT_NIGHT_END

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
              <iframe
                src={`https://bookings.zenchef.com/results?rid=${ZENCHEF_RID}&pid=1001&color=c9a84c`}
                title="Réservation Vila Thaï"
                width="100%"
                frameBorder="0"
                allow="payment"
              />
            </div>
          </>
        )}

      </div>
    </section>
  )
}
