import { useTranslation } from 'react-i18next'
import './Cocktails.scss'

const COCKTAILS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']

export default function Cocktails() {
  const { t } = useTranslation()

  return (
    <section id="cocktails" className="cocktails">
      <div className="cocktails__inner">

        <p className="cocktails__tag">{t('cocktails.tag')}</p>
        <h2 className="cocktails__title">{t('cocktails.title')}</h2>
        <p className="cocktails__subtitle">{t('cocktails.subtitle')}</p>

        <div className="cocktails__grid">
          {COCKTAILS.map(c => (
            <div key={c} className="cocktails__card">
              <div className="cocktails__card-accent" />
              <h3 className="cocktails__name">{t(`cocktails.${c}_name`)}</h3>
              <p className="cocktails__desc">{t(`cocktails.${c}_desc`)}</p>
              <span className="cocktails__price">{t(`cocktails.${c}_price`)}</span>
            </div>
          ))}
        </div>

        <a href="#reservation" className="cocktails__cta">{t('nav.reserve')}</a>

      </div>
    </section>
  )
}
