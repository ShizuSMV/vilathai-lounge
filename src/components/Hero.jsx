import { useTranslation } from 'react-i18next'
import heroBg from '../assets/img/salle-ensemble.webp'
import './Hero.scss'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="accueil" className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__location">{t('hero.location')}</p>
        <h1 className="hero__title">
          Vila&nbsp;Thaï<span>Lounge</span>
        </h1>
        <div className="hero__divider" />
        <p className="hero__subtitle">{t('hero.subtitle')}</p>
        <p className="hero__address">{t('hero.address')}</p>
        <a href="#reservation" className="hero__cta">{t('hero.cta')}</a>
      </div>

      <a href="#apropos" className="hero__scroll" aria-label="Défiler vers le bas">
        <span />
      </a>
    </section>
  )
}
