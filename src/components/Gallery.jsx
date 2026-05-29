import { useTranslation } from 'react-i18next'
import imgSalle     from '../assets/img/salle-principale.webp'
import imgLounge    from '../assets/img/salle-lounge.webp'
import imgBar       from '../assets/img/bar-lounge.webp'
import imgTable     from '../assets/img/table-dressee.webp'
import imgDecor     from '../assets/img/decor-mains-or.webp'
import imgEnseigne  from '../assets/img/enseigne.webp'
import imgSay       from '../assets/img/say-restaurant.webp'
import './Gallery.scss'

const ITEMS = [
  { img: imgSalle,    featured: true,  alt: 'alt1' },
  { img: imgLounge,   featured: false, alt: 'alt2' },
  { img: imgBar,      featured: false, alt: 'alt3' },
  { img: imgTable,    featured: false, alt: 'alt4' },
  { img: imgDecor,    featured: true,  alt: 'alt5' },
  { img: imgEnseigne, featured: false, alt: 'alt6' },
  { img: imgSay,      featured: false, alt: 'alt7' },
]

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <section id="galerie" className="gallery">
      <div className="gallery__container">
        <div className="gallery__header">
          <span className="gallery__tag">{t('gallery.tag')}</span>
          <h2 className="gallery__title">{t('gallery.title')}</h2>
          <div className="gallery__divider" />
          <p className="gallery__subtitle">{t('gallery.subtitle')}</p>
        </div>

        <div className="gallery__grid">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`gallery__item${item.featured ? ' gallery__item--featured' : ''}`}
            >
              <div className="gallery__cell">
                <img src={item.img} alt={t(`gallery.${item.alt}`)} loading="lazy" decoding="async" />
                <div className="gallery__cell-overlay">
                  <span>{t(`gallery.${item.alt}`)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
