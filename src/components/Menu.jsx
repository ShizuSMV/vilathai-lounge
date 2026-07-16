import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Menu.scss'

import imgAssortiment from '../assets/img/dishes/assortiment.webp'
import imgTomyam      from '../assets/img/dishes/tomyam.webp'
import imgLapsine     from '../assets/img/dishes/lapsine.webp'
import imgSomtam      from '../assets/img/dishes/somtam.webp'
import imgCurryrogue  from '../assets/img/dishes/curryrogue.webp'
import imgGambascurry from '../assets/img/dishes/gambascurry.webp'
import imgLoclac      from '../assets/img/dishes/loclac.webp'
import imgPadtalay    from '../assets/img/dishes/padtalay.webp'
import imgPadthai     from '../assets/img/dishes/padthai.webp'
import imgSuea        from '../assets/img/dishes/suea.webp'
import imgMango       from '../assets/img/dishes/mangosticky.webp'
import imgAnanas      from '../assets/img/dishes/ananas.webp'
import imgFlanthai    from '../assets/img/dishes/flanthai.webp'
import imgPerlecoco   from '../assets/img/dishes/perlecoco.webp'

const DISHES = [
  // Entrées
  { id: 'assortiment', cat: 'starters', price: '12€', img: imgAssortiment, bg: 'linear-gradient(135deg,#2a1f10,#1a1518)' },
  { id: 'tomyam',      cat: 'starters', price: '12€', img: imgTomyam,      bg: 'linear-gradient(135deg,#2a1008,#1a1518)' },
  { id: 'lapsine',     cat: 'starters', price: '15€', img: imgLapsine,     bg: 'linear-gradient(135deg,#251010,#1a1518)' },
  { id: 'somtam',      cat: 'starters', price: '15€', img: imgSomtam,      bg: 'linear-gradient(135deg,#122018,#1a1518)' },
  // Plats
  { id: 'curryrogue',  cat: 'mains',    price: '19€', img: imgCurryrogue,  bg: 'linear-gradient(135deg,#2a1008,#1a1518)' },
  { id: 'gambascurry', cat: 'mains',    price: '25€', img: imgGambascurry, bg: 'linear-gradient(135deg,#1a2010,#1a1518)' },
  { id: 'loclac',      cat: 'mains',    price: '22€', img: imgLoclac,      bg: 'linear-gradient(135deg,#251010,#1a1518)' },
  { id: 'padtalay',    cat: 'mains',    price: '25€', img: imgPadtalay,    bg: 'linear-gradient(135deg,#0e2018,#1a1518)' },
  { id: 'padthai',     cat: 'mains',    price: '19€', img: imgPadthai,     bg: 'linear-gradient(135deg,#2a1a0a,#1a1518)' },
  { id: 'suea',        cat: 'mains',    price: '27€', img: imgSuea,        bg: 'linear-gradient(135deg,#251015,#1a1518)' },
  // Desserts
  { id: 'mangosticky', cat: 'desserts', price: '12€', img: imgMango,       bg: 'linear-gradient(135deg,#2a220a,#1a1518)' },
  { id: 'ananas',      cat: 'desserts', price: '10€', img: imgAnanas,      bg: 'linear-gradient(135deg,#2a1f05,#1a1518)' },
  { id: 'flanthai',    cat: 'desserts', price: '10€', img: imgFlanthai,    bg: 'linear-gradient(135deg,#2a1808,#1a1518)' },
  { id: 'perlecoco',   cat: 'desserts', price: '10€', img: imgPerlecoco,   bg: 'linear-gradient(135deg,#0a2020,#1a1518)' },
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
              <div
                className="dish-card__img"
                style={dish.img
                  ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 55%), url(${dish.img})` }
                  : { background: dish.bg }}
              >
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
