import { useTranslation } from 'react-i18next'
import heroImg from '../assets/hero.png'
import './Gallery.scss'

const ITEMS = [
  { id: 1, featured: true,  pos: '50% 20%', filter: 'brightness(0.9)' },
  { id: 2, featured: false, pos: '15% 50%', filter: 'brightness(0.85) contrast(1.1)' },
  { id: 3, featured: false, pos: '85% 40%', filter: 'brightness(0.8) saturate(0.9)' },
  { id: 4, featured: false, pos: '50% 70%', filter: 'brightness(0.9) contrast(1.05)' },
  { id: 5, featured: true,  pos: '50% 50%', filter: 'brightness(0.85)' },
  { id: 6, featured: false, pos: '70% 25%', filter: 'brightness(0.8) saturate(1.1)' },
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
          {ITEMS.map(item => (
            <div
              key={item.id}
              className={`gallery__item${item.featured ? ' gallery__item--featured' : ''}`}
            >
              <div className="gallery__cell">
                <img
                  src={heroImg}
                  alt={t(`gallery.alt${item.id}`)}
                  style={{ objectPosition: item.pos, filter: item.filter }}
                />
                <div className="gallery__cell-overlay">
                  <span>{t(`gallery.alt${item.id}`)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
