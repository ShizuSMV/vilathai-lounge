import { useTranslation } from 'react-i18next'
import './Reservation.scss'

const ZENCHEF_RID = '371140'

export default function Reservation() {
  const { t } = useTranslation()

  return (
    <section id="reservation" className="resv">
      <div className="resv__container">
        <div className="resv__header">
          <span className="resv__tag">{t('reservation.tag')}</span>
          <h2 className="resv__title">{t('reservation.title')}</h2>
          <div className="resv__divider" />
          <p className="resv__subtitle">{t('reservation.subtitle')}</p>
        </div>

        <div className="resv__widget">
          <iframe
            src={`https://bookings.zenchef.com/results?rid=${ZENCHEF_RID}&pid=1001`}
            title="Réservation Vila Thaï Lounge — ZenChef"
            width="100%"
            frameBorder="0"
            allow="payment"
          />
        </div>
      </div>
    </section>
  )
}
