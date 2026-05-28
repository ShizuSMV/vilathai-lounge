import { useTranslation } from 'react-i18next'
import './Footer.scss'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__grid">

        <div className="footer__brand">
          <span className="footer__logo">Vila Thaï<em>Lounge</em></span>
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>

        <div className="footer__col">
          <h4>{t('footer.find_us')}</h4>
          <address>
            10 rue de l'Arc<br />59800 Lille
          </address>
          <a href="tel:+33328046938">+33 3 28 04 69 38</a>
        </div>

        <div className="footer__col">
          <h4>{t('footer.hours_title')}</h4>
          <ul className="footer__hours">
            <li><span>{t('footer.open_days')}</span><span>{t('footer.open_hours')}</span></li>
            <li><span>{t('footer.monday')}</span><span>{t('footer.monday_hours')}</span></li>
          </ul>
          <div className="footer__access">
            <h4>{t('footer.access_title')}</h4>
            <p>🚇 {t('footer.metro')}</p>
            <p>🅿️ {t('footer.parking')}</p>
          </div>
        </div>

        <div className="footer__col">
          <h4>{t('footer.follow')}</h4>
          <div className="footer__socials">
            <a
              href="https://www.instagram.com/vila_thailille"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61567117061456"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© {year} Vila Thaï Lounge · {t('footer.rights')}</p>
        <a href="#accueil" className="footer__top">↑ {t('footer.back_top')}</a>
      </div>
    </footer>
  )
}
