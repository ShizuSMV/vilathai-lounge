import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Menu.scss'

const DISHES = [
  { id: 'tomkha',      cat: 'starters', price: '12€', bg: 'linear-gradient(135deg,#2a1f10,#1a1518)' },
  { id: 'somtam',      cat: 'starters', price: '11€', bg: 'linear-gradient(135deg,#122018,#1a1518)' },
  { id: 'raviolis',    cat: 'starters', price: '9€',  bg: 'linear-gradient(135deg,#1e1825,#1a1518)' },
  { id: 'padthai',     cat: 'mains',    price: '17€', bg: 'linear-gradient(135deg,#2a1a0a,#1a1518)' },
  { id: 'greencurry',  cat: 'mains',    price: '18€', bg: 'linear-gradient(135deg,#0e2018,#1a1518)' },
  { id: 'canard',      cat: 'mains',    price: '22€', bg: 'linear-gradient(135deg,#251010,#1a1518)' },
  { id: 'mangosticky', cat: 'desserts', price: '8€',  bg: 'linear-gradient(135deg,#2a220a,#1a1518)' },
  { id: 'cremepandan', cat: 'desserts', price: '7€',  bg: 'linear-gradient(135deg,#0a2015,#1a1518)' },
]

const CATEGORIES = ['all', 'starters', 'mains', 'desserts']

export default function Menu() {
  const { t } = useTranslation()
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? DISHES
    : DISHES.filter(d => d.cat === active)

  return (
    <section id="cuisine" className="menu">
      <div className="menu__container">
        <div className="menu__header">
          <span className="menu__tag">{t('menu.tag')}</span>
          <h2 className="menu__title">{t('menu.title')}</h2>
          <div className="menu__divider" />
        </div>

        <div className="menu__tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`menu__tab${active === cat ? ' menu__tab--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {t(`menu.${cat}`)}
            </button>
          ))}
        </div>

        <div className="menu__grid">
          {filtered.map(dish => (
            <article key={dish.id} className="dish-card">
              <div className="dish-card__img" style={{ background: dish.bg }}>
                <span className="dish-card__cat">{t(`menu.${dish.cat}`)}</span>
              </div>
              <div className="dish-card__body">
                <div className="dish-card__top">
                  <h3 className="dish-card__name">{t(`menu.dishes.${dish.id}.name`)}</h3>
                  <span className="dish-card__price">{dish.price}</span>
                </div>
                <p className="dish-card__desc">{t(`menu.dishes.${dish.id}.desc`)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="menu__cta">
          <a href="#reservation" className="menu__reserve-btn">{t('menu.cta')}</a>
        </div>
      </div>
    </section>
  )
}
