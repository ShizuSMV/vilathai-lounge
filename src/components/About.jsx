import { useTranslation } from 'react-i18next'
import sayImg    from '../assets/img/say-portrait.webp'
import matteoImg from '../assets/img/matteo-portrait.webp'
import bgImg     from '../assets/img/salle-ensemble.webp'
import './About.scss'

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="apropos" className="about">
      <div className="about__bg" style={{ backgroundImage: `url(${bgImg})` }} />
      <div className="about__overlay" />

      <div className="about__container">
        <div className="about__text">
          <span className="about__tag">{t('about.tag')}</span>
          <h2 className="about__title">
            {t('about.title_line1')}<br />{t('about.title_line2')}
          </h2>
          <div className="about__divider" />
          <p className="about__desc">{t('about.p1')}</p>
          <p className="about__desc">{t('about.p2')}</p>
          <div className="about__facts">
            <div className="about__fact">
              <span className="about__fact-value">{t('about.fact1_value')}</span>
              <span className="about__fact-label">{t('about.fact1_label')}</span>
            </div>
            <div className="about__fact">
              <span className="about__fact-value">{t('about.fact2_value')}</span>
              <span className="about__fact-label">{t('about.fact2_label')}</span>
            </div>
            <div className="about__fact">
              <span className="about__fact-value">{t('about.fact3_value')}</span>
              <span className="about__fact-label">{t('about.fact3_label')}</span>
            </div>
          </div>
        </div>

        <div className="about__visual">
          <div className="about__team">

            <div className="about__portrait about__portrait--bw">
              <img src={sayImg} alt="Say — Gérant Vila Thaï" loading="lazy" decoding="async" />
              <div className="about__portrait-info">
                <span className="about__portrait-name">Say</span>
                <span className="about__portrait-role">{t('about.gerant_role')}</span>
              </div>
            </div>

            <div className="about__portrait about__portrait--bw">
              <img src={matteoImg} alt="Matteo — Responsable de salle" loading="lazy" decoding="async" />
              <div className="about__portrait-info">
                <span className="about__portrait-name">Matteo</span>
                <span className="about__portrait-role">{t('about.mdr_role')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
