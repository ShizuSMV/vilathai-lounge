import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './Inauguration.scss'

const STEPS = ['s1', 's2', 's3', 's4', 's5']
const EVENT_DATE = new Date('2026-06-20T19:00:00')
const FW_COLORS = ['#c9a84c', '#d9b86a', '#f5f0eb', '#ffffff', '#e8d5a3', '#ffd77a']

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false })
  useEffect(() => {
    const tick = () => {
      const diff = EVENT_DATE - new Date()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true }); return }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        done: false,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return timeLeft
}

function runFireworks(canvas) {
  const ctx = canvas.getContext('2d')
  let animId
  let frame = 0
  const particles = []

  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
  resize()
  window.addEventListener('resize', resize)

  const rand = (min, max) => Math.random() * (max - min) + min

  function spawnRocket() {
    return {
      x: rand(canvas.width * 0.15, canvas.width * 0.85),
      y: canvas.height + 10,
      vx: rand(-1.2, 1.2),
      vy: rand(-11, -8),
      gravity: 0.045,
      life: 1,
      decay: rand(0.003, 0.006),
      size: 3,
      color: FW_COLORS[Math.floor(rand(0, FW_COLORS.length))],
      isRocket: true,
    }
  }

  function explode(x, y) {
    const count = Math.floor(rand(65, 110))
    const hue = FW_COLORS[Math.floor(rand(0, FW_COLORS.length))]
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + rand(-0.15, 0.15)
      const speed = rand(1.5, 6.5)
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(0, 1.5),
        gravity: rand(0.06, 0.12),
        friction: rand(0.97, 0.99),
        life: 1,
        decay: rand(0.01, 0.022),
        size: rand(0.8, 3),
        color: Math.random() < 0.25 ? '#ffffff' : hue,
        isRocket: false,
      })
    }
  }

  function tick() {
    ctx.fillStyle = 'rgba(0,0,0,0.16)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (frame % 20 === 0 && frame < 400) particles.push(spawnRocket())

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.vx *= (p.friction || 1)
      p.x += p.vx
      p.y += p.vy
      p.vy += p.gravity
      p.life -= p.decay

      if (p.isRocket) {
        if (p.vy >= -0.8) { explode(p.x, p.y); particles.splice(i, 1); continue }
        ctx.save()
        ctx.globalAlpha = Math.min(1, p.life)
        ctx.shadowColor = p.color; ctx.shadowBlur = 10
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      } else {
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life * 0.85)
        ctx.shadowColor = p.color; ctx.shadowBlur = 5
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * Math.max(0.1, p.life), 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }
    }

    frame++
    if (frame < 460 || particles.length > 0) {
      animId = requestAnimationFrame(tick)
    } else {
      let op = 1
      const fade = () => {
        op -= 0.025
        canvas.style.opacity = Math.max(0, op)
        if (op > 0) requestAnimationFrame(fade)
        else canvas.style.display = 'none'
      }
      fade()
    }
  }

  tick()
  return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
}

export default function Inauguration() {
  const { t } = useTranslation()
  const { days, hours, minutes, seconds, done } = useCountdown()
  const canvasRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (!done || revealed) return
    setRevealed(true)
    const tid = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.display = 'block'
        canvasRef.current.style.opacity = '1'
        cleanupRef.current = runFireworks(canvasRef.current)
      }
    }, 700)
    return () => clearTimeout(tid)
  }, [done, revealed])

  useEffect(() => () => { if (cleanupRef.current) cleanupRef.current() }, [])

  return (
    <section id="evenement" className={`inauguration${revealed ? ' inauguration--revealed' : ''}`}>
      <canvas ref={canvasRef} className="inauguration__canvas" />

      <div className="inauguration__inner">

        <p className="inauguration__tag">{t('inauguration.tag')}</p>
        <h2 className="inauguration__title">{t('inauguration.title')}</h2>

        <div className="inauguration__subtitle-wrap">
          <p className={`inauguration__sub inauguration__sub--before${revealed ? ' inauguration__sub--out' : ''}`}>
            {t('inauguration.subtitle')}
          </p>
          <p className={`inauguration__sub inauguration__sub--after${revealed ? ' inauguration__sub--in' : ''}`}>
            Vila&nbsp;Thaï <span>Lounge</span>
          </p>
        </div>

        <div className="inauguration__badge">
          <span className="inauguration__badge-date">{t('inauguration.date')}</span>
          <span className="inauguration__badge-time">{t('inauguration.time')}</span>
        </div>

        {!revealed && (
          <div className="inauguration__countdown">
            <p className="inauguration__countdown-label">{t('inauguration.countdown_title')}</p>
            <div className="inauguration__countdown-grid">
              {[
                [days,    t('inauguration.days')],
                [hours,   t('inauguration.hours')],
                [minutes, t('inauguration.minutes')],
                [seconds, t('inauguration.seconds')],
              ].map(([val, lbl]) => (
                <div key={lbl} className="inauguration__countdown-unit">
                  <span className="inauguration__countdown-num">{String(val).padStart(2, '0')}</span>
                  <span className="inauguration__countdown-text">{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {revealed && (
          <p className="inauguration__reveal-msg">L'heure est venue ✦</p>
        )}

        <div className="inauguration__program">
          <p className="inauguration__program-title">{t('inauguration.program')}</p>
          <ul className="inauguration__timeline">
            {STEPS.map(s => (
              <li key={s} className="inauguration__step">
                <span className="inauguration__step-time">{t(`inauguration.${s}_time`)}</span>
                <div className="inauguration__step-dot" />
                <div className="inauguration__step-content">
                  <strong>{t(`inauguration.${s}_label`)}</strong>
                  <span>{t(`inauguration.${s}_desc`)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <a href="#reservation" className="inauguration__cta">{t('inauguration.cta')}</a>

      </div>
    </section>
  )
}
