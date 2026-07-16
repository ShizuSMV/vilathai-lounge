import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LegalModal from './LegalModal'
import './Footer.scss'

function MentionsContent() {
  return (
    <>
      <h3>Éditeur du site</h3>
      <p><strong>VILATHAI (VT)</strong><br />
      Société par actions simplifiée (SAS) au capital de 1 000 €<br />
      SIREN : 930 919 006<br />
      SIRET : 930 919 006 00013<br />
      N° TVA intracommunautaire : FR57 930 919 006<br />
      Code APE/NAF : 56.10A — Restauration traditionnelle<br />
      Siège social : 10 rue de l'Arc, 59800 Lille<br />
      Téléphone : +33 3 28 04 69 38<br />
      Email : <a href="mailto:vilathailille@gmail.com">vilathailille@gmail.com</a></p>

      <h3>Directeur de la publication</h3>
      <p>Say — Gérant de VILATHAI (VT)</p>

      <h3>Hébergement</h3>
      <p><strong>Vercel Inc.</strong><br />
      440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
      <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></p>

      <h3>Propriété intellectuelle</h3>
      <p>L'ensemble des contenus présents sur ce site (textes, images, logo) sont la propriété exclusive de VILATHAI (VT). Toute reproduction sans autorisation préalable est interdite.</p>

      <h3>Responsabilité</h3>
      <p>VILATHAI (VT) s'efforce d'assurer l'exactitude des informations publiées. Ces informations sont fournies à titre indicatif et peuvent être modifiées à tout moment.</p>
    </>
  )
}

function PrivacyContent() {
  return (
    <>
      <h3>Responsable du traitement</h3>
      <p>VILATHAI (VT) — 10 rue de l'Arc, 59800 Lille<br />
      Contact : <a href="mailto:vilathailille@gmail.com">vilathailille@gmail.com</a></p>

      <h3>Données collectées</h3>
      <p>Via le formulaire de réservation (ZenChef) : nom, prénom, email, téléphone, nombre de couverts, date et heure. Ces données sont traitées par <strong>ZenChef SAS</strong> en qualité de sous-traitant pour la gestion des réservations.</p>

      <h3>Finalité</h3>
      <p>Gestion, confirmation et suivi des réservations de table. Aucune utilisation à des fins commerciales ou publicitaires.</p>

      <h3>Durée de conservation</h3>
      <p>3 ans à compter de la date de la dernière réservation.</p>

      <h3>Cookies</h3>
      <p><strong>Google Fonts</strong> — polices de caractères, cookies fonctionnels.<br />
      <strong>ZenChef</strong> — formulaire de réservation, cookies nécessaires au service.<br />
      Aucun cookie publicitaire ou de mesure d'audience n'est utilisé.</p>

      <h3>Vos droits (RGPD)</h3>
      <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition (articles 15 à 22 du RGPD). Contactez-nous : <a href="mailto:vilathailille@gmail.com">vilathailille@gmail.com</a></p>

      <h3>Réclamation CNIL</h3>
      <p><a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a></p>

      <h3>Sous-traitant</h3>
      <p>ZenChef SAS — <a href="https://www.zenchef.com/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">Politique de confidentialité ZenChef</a></p>
    </>
  )
}

export default function Footer() {
  const { t }         = useTranslation()
  const year          = new Date().getFullYear()
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const handler = () => setModal('privacy')
    window.addEventListener('open-privacy', handler)
    return () => window.removeEventListener('open-privacy', handler)
  }, [])

  return (
    <>
      <footer className="footer">
        <div className="footer__grid">

          <div className="footer__brand">
            <span className="footer__logo">Vila Thaï</span>
            <p className="footer__tagline">{t('footer.tagline')}</p>
          </div>

          <div className="footer__col">
            <h4>{t('footer.find_us')}</h4>
            <address>10 rue de l'Arc<br />59800 Lille</address>
            <a href="tel:+33328046938">+33 3 28 04 69 38</a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Vila+Thai+Lille"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__map-link"
            >
              {t('footer.map_link')} →
            </a>
          </div>

          <div className="footer__col">
            <h4>{t('footer.hours_title')}</h4>
            <ul className="footer__hours">
              <li><span>{t('footer.day_lun')}</span><span>{t('footer.closed')}</span></li>
              <li><span>{t('footer.day_mar')}</span><span>12h – 14h &nbsp;·&nbsp; 19h – 22h30</span></li>
              <li><span>{t('footer.day_mer_ven')}</span><span>19h – 22h30</span></li>
              <li><span>{t('footer.day_sam')}</span><span>12h – 14h &nbsp;·&nbsp; 19h – 23h30</span></li>
              <li><span>{t('footer.day_dim')}</span><span>{t('footer.closed')}</span></li>
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
              <a href="https://www.instagram.com/vila_thailille" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61567117061456" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            </div>
          </div>

        </div>

        <div className="footer__map">
          <iframe
            src="https://maps.google.com/maps?q=50.6365,3.0635&output=embed&z=17&hl=fr"
            title="Vila Thaï — 10 rue de l'Arc, Lille"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="footer__bottom">
          <p>© {year} Vila Thaï · {t('footer.rights')}</p>
          <div className="footer__legal-links">
            <button onClick={() => setModal('mentions')}>Mentions légales</button>
            <span>·</span>
            <button onClick={() => setModal('privacy')}>Politique de confidentialité</button>
          </div>
          <a href="#accueil" className="footer__top">↑ {t('footer.back_top')}</a>
        </div>
      </footer>

      {modal === 'mentions' && (
        <LegalModal title="Mentions légales" onClose={() => setModal(null)}>
          <MentionsContent />
        </LegalModal>
      )}
      {modal === 'privacy' && (
        <LegalModal title="Politique de confidentialité" onClose={() => setModal(null)}>
          <PrivacyContent />
        </LegalModal>
      )}
    </>
  )
}
