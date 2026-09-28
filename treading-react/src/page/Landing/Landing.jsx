import { createElement, useEffect, useState } from 'react'
import { ArrowRight, BarChart3, Check, Clock3, LockKeyhole, Menu, Monitor, ShieldCheck, TrendingUp, WalletCards, X, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import ForgotPasswordForm from '../Auth/ForgotPasswordForm'
import SignupForm from '../Auth/SignupForm'
import SigninForm from '../Auth/SigninForm'
import './Landing.css'

const tokens = [
  ['BTC', '83,902.10', '-2.99%', false, '#f7931a'],
  ['ETH', '2,656.67', '-3.30%', false, '#627eea'],
  ['BNB', '763.35', '-3.37%', false, '#f3ba2f'],
  ['SOL', '114.04', '-3.05%', false, '#14f195'],
  ['ADA', '0.4471', '+0.68%', true, '#2f6bff'],
  ['AVAX', '36.92', '+4.05%', true, '#e84142'],
  ['LINK', '17.86', '+1.24%', true, '#2a5ada'],
  ['TRX', '0.3386', '-0.71%', false, '#ef0027'],
]

const slides = [
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2400&q=85',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2400&q=85',
  'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=2400&q=85',
]

const features = [
  [Zap, 'Ultra-Fast Execution', 'Sub-50ms order routing with smart matching keeps slippage low during volatility.'],
  [TrendingUp, 'Advanced Charting', 'Professional charts with multi-timeframe overlays and powerful indicators.'],
  [Monitor, 'Real-Time Market Data', 'Live order-book depth, trade tape, and tick-level history in your browser.'],
  [ShieldCheck, 'Institutional Security', 'Encryption, 2FA, withdrawal controls, and cold-storage custody protect every account.'],
  [Clock3, '24/7 Markets', 'Trade around the clock with live support ready whenever the market moves.'],
  [WalletCards, 'Portfolio Analytics', 'Track P&L, win rate, drawdown, and tax-ready reports from one dashboard.'],
]

function TokenRow() {
  const row = [...tokens, ...tokens]
  return (
    <div className="landing-ticker" aria-label="Live market prices">
      <div className="landing-ticker__track">
        {row.map(([symbol, price, change, up, color], index) => (
          <span className="landing-ticker__item" key={`${symbol}-${index}`}>
            <span className="landing-ticker__icon" style={{ background: color }} />
            <strong>{symbol}</strong>
            <span>${price}</span>
            <b className={up ? 'is-up' : 'is-down'}>{change}</b>
          </span>
        ))}
      </div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="landing-preview">
      <span className="landing-preview__status"><i /> LIVE</span>
      <aside className="landing-preview__sidebar">
        {[BarChart3, TrendingUp, WalletCards, ShieldCheck].map((Icon, index) => <span className={index === 0 ? 'active' : ''} key={index}><Icon size={16} /></span>)}
      </aside>
      <div className="landing-preview__main">
        <div className="landing-preview__header"><span className="active">Markets</span><span>Portfolio</span><span>Activity</span><span className="avatar" /></div>
        <div className="landing-preview__body">
          <div className="landing-preview__list">
            {tokens.slice(0, 5).map(([symbol, price, change, up, color]) => <div className="landing-preview__row" key={symbol}><span><i style={{ background: color }} />{symbol}</span><em>${price}</em><b className={up ? 'is-up' : 'is-down'}>{change}</b></div>)}
          </div>
          <div className="landing-preview__chart">
            <div className="landing-preview__chart-title"><span><i style={{ background: '#627eea' }} /> ETH / USD</span><small>Ethereum</small></div>
            <strong>$2,656.67</strong><b className="is-down">-3.30%</b>
            <svg viewBox="0 0 360 170" preserveAspectRatio="none" aria-label="ETH price chart"><path d="M0 126L24 118L48 130L72 96L96 108L120 72L144 88L168 56L192 78L216 44L240 64L264 34L288 53L312 28L336 42L360 18V170H0Z" /><path className="line" d="M0 126L24 118L48 130L72 96L96 108L120 72L144 88L168 56L192 78L216 44L240 64L264 34L288 53L312 28L336 42L360 18" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const [slide, setSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')

  const openAuth = (mode = 'signin') => {
    setAuthMode(mode)
    setLoginOpen(true)
  }

  useEffect(() => {
    const timer = window.setInterval(() => setSlide(current => (current + 1) % slides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="landing-page">
      <TokenRow />
      <nav className={`landing-nav ${menuOpen ? 'is-open' : ''}`}>
        <div className="landing-wrap landing-nav__inner">
          <Link className="landing-logo" to="/"><span>B</span> BgTrading</Link>
          <div className="landing-nav__links">
            <a href="#markets" onClick={() => setMenuOpen(false)}>Markets</a><a href="#features" onClick={() => setMenuOpen(false)}>Features</a><a href="#security" onClick={() => setMenuOpen(false)}>Security</a><a href="#support" onClick={() => setMenuOpen(false)}>Support</a>
          </div>
          <div className="landing-nav__actions"><button className="landing-btn landing-btn--ghost" onClick={() => openAuth()}>Log In</button><button className="landing-btn landing-btn--primary" onClick={() => openAuth('signup')}>Get Started</button><button className="landing-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button></div>
        </div>
      </nav>

      <header className="landing-hero" id="markets">
        <div className="landing-hero__slides">{slides.map((image, index) => <div key={image} className={`landing-hero__slide ${index === slide ? 'is-active' : ''}`} style={{ backgroundImage: `url(${image})` }} />)}</div>
        <div className="landing-hero__veil" /><div className="landing-hero__grid" /><div className="landing-hero__glow" />
        <div className="landing-wrap landing-hero__content"><div className="landing-hero__copy"><div className="landing-eyebrow"><i /> Live markets · 0.05s execution</div><h1>Trade with <span>precision.</span><br />Execute with speed.</h1><p>Institutional-grade tools for the modern trader. Real-time analytics, advanced charting, and lightning-fast order execution in one secure platform.</p><div className="landing-hero__actions"><button className="landing-btn landing-btn--primary landing-btn--large" onClick={() => openAuth()}>Log In to Dashboard <ArrowRight size={16} /></button><a className="landing-btn landing-btn--ghost landing-btn--large" href="#features">Explore Features</a></div><small><LockKeyhole size={15} /> Bank-grade security · 2FA · Cold storage</small></div><DashboardPreview /></div>
        <div className="landing-dots">{slides.map((_, index) => <button key={index} className={index === slide ? 'active' : ''} aria-label={`Show slide ${index + 1}`} onClick={() => setSlide(index)} />)}</div>
      </header>

      <section className="landing-stats"><div className="landing-wrap landing-stats__grid"><div><strong>$4.2B+</strong><span>Monthly Trading Volume</span></div><div><strong>1.2M+</strong><span>Active Traders</span></div><div><strong>0.05s</strong><span>Average Execution Time</span></div><div><strong>99.99%</strong><span>Platform Uptime</span></div></div></section>

      <section className="landing-section" id="features"><div className="landing-wrap"><div className="landing-section__heading"><span>Why BgTrading</span><h2>Everything you need to trade professionally</h2><p>A complete suite of tools designed for speed, clarity, and control.</p></div><div className="landing-features">{features.map(([FeatureIcon, title, description]) => <article key={title}><span className="landing-feature__icon">{createElement(FeatureIcon, { size: 20 })}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="landing-section landing-section--tight" id="security"><div className="landing-wrap"><div className="landing-security"><div><h2>Your capital, protected at every layer</h2><p>Security is a product feature, not a checkbox. Every layer of our stack is hardened, audited, and monitored around the clock.</p><ul><li><Check /><span><b>Cold Storage Custody</b><small>95% of assets held offline in distributed vaults.</small></span></li><li><Check /><span><b>Two-Factor Authentication</b><small>TOTP, SMS, and hardware key support.</small></span></li><li><Check /><span><b>Real-Time Risk Engine</b><small>Anomaly detection flags unusual activity instantly.</small></span></li></ul></div><div className="landing-shield"><ShieldCheck size={78} /></div></div></div></section>

      <section className="landing-section landing-section--cta"><div className="landing-wrap"><div className="landing-cta"><h2>Ready to make your next move?</h2><p>Log in to your dashboard and pick up right where you left off.</p><button className="landing-btn landing-btn--primary landing-btn--large" onClick={() => openAuth()}>Log In to Dashboard <ArrowRight size={16} /></button></div></div></section>
      <footer className="landing-footer" id="support"><div className="landing-wrap"><div className="landing-footer__top"><div className="landing-footer__brand"><Link className="landing-logo" to="/"><span>B</span> BgTrading</Link><p>Fast, secure, and transparent trading for everyone, from your first trade to an institutional desk.</p><div className="landing-footer__status"><i /> All systems operational</div></div><div className="landing-footer__column"><b>Product</b><a href="#features">Features</a><a href="#markets">Markets</a><a href="#security">Security</a></div><div className="landing-footer__column"><b>Company</b><a href="#security">About BgTrading</a><a href="#support">Contact</a><Link to="/api-status">System Status</Link></div><div className="landing-footer__column"><b>Resources</b><a href="#features">Help Center</a><a href="#security">Risk Disclosure</a><a href="#security">API Access</a></div></div><div className="landing-footer__bottom"><span>© 2024 BgTrading. All rights reserved.</span><span>Privacy Policy · Terms of Service</span></div></div></footer>
      {loginOpen && <div className="landing-login" role="dialog" aria-modal="true" aria-label="BgTrading account access"><button className="landing-login__backdrop" aria-label="Close account access" onClick={() => setLoginOpen(false)} /><div className="landing-login__panel"><button className="landing-login__close" aria-label="Close account access" onClick={() => setLoginOpen(false)}><X size={18} /></button><div className="landing-login__brand"><span>B</span><b>BgTrading</b></div>{authMode === 'signin' && <><SigninForm /><div className="landing-login__links"><button onClick={() => setAuthMode('signup')}>Create an account</button><button onClick={() => setAuthMode('forgot')}>Forgot password?</button></div></>}{authMode === 'signup' && <><SignupForm /><div className="landing-login__switch">Already have an account? <button onClick={() => setAuthMode('signin')}>Log in</button></div></>}{authMode === 'forgot' && <><ForgotPasswordForm /><div className="landing-login__switch"><button onClick={() => setAuthMode('signin')}>Back to login</button></div></>}</div></div>}
    </main>
  )
}
