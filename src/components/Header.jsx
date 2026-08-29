import { useState } from 'react';
import { navigation } from '../data/tracks/index.js';
import { games } from '../data/games/index.js';
import { drivers } from '../data/pilots/index.js';

export default function Header({ onGameMenu, gameMenuOpen, onTeamMenu, teamMenuOpen, gameId, onGameSelect, driverId, onTeamSelect, mobileMenuOpen, onMobileMenu, setMobileMenuOpen }) {
  const [mGame, setMGame] = useState(false);
  const [mTeam, setMTeam] = useState(false);

  const closeMobile = () => { setMobileMenuOpen(false); setMGame(false); setMTeam(false); };

  return (
    <>
      <div className="top-line" />
      <header className="utility-bar"><span className="checker" /> MUGELLO CIRCUIT <b>• SCUDERIA</b><span className="utility-right">MUGELLO 5.245</span></header>
      <nav className="main-nav">
        <a className="logo" href="#top"><span>СайтСотика</span><small>ГОНОЧНАЯ ИМПЕРИЯ</small></a>
        <div className="nav-links">{navigation.map((item, index) => {
          if (item === 'Игры') return <a className={`game-trigger ${gameMenuOpen ? 'active' : ''}`} href="#игры" onClick={(e) => { e.preventDefault(); onGameMenu(); }} key={item}>{item}</a>;
          if (item === 'Команда') return <a className={`team-trigger ${teamMenuOpen ? 'active' : ''}`} href="#команда" onClick={(e) => { e.preventDefault(); onTeamMenu(); }} key={item}>{item}</a>;
          return <a className={index === 0 ? 'active' : ''} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>{item}</a>;
        })}</div>
        <button className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`} onClick={onMobileMenu} aria-label="Меню">
          <span /><span /><span />
        </button>
        {gameMenuOpen && !mobileMenuOpen && <div className="game-menu-dropdown">{games.map((item) => <button className={item.id === gameId ? 'selected' : ''} onClick={() => onGameSelect(item.id)} key={item.id}><b>{item.name}</b><small>{item.number} / {item.detail}</small></button>)}</div>}
        {teamMenuOpen && !mobileMenuOpen && <div className="team-menu-dropdown">{drivers.map((item) => <button className={item.id === driverId ? 'selected' : ''} onClick={() => onTeamSelect(item.id)} key={item.id}><b>{item.initials}</b><strong>{item.name}</strong><span>{item.role}</span></button>)}</div>}
      </nav>
      {mobileMenuOpen && <div className="mobile-menu-panel" onClick={(e) => { if (e.target === e.currentTarget) closeMobile(); }}>
        <div className="mobile-menu-panel-inner">
          <div className="mobile-menu-panel-header">
            <span className="mobile-menu-panel-logo">СайтСотика</span>
            <button className="mobile-menu-panel-close" onClick={closeMobile}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className="mobile-menu-panel-nav">
            {navigation.map((item, i) => {
              if (item === 'Игры') return <div key={item} className="mobile-menu-item" style={{animationDelay: `${i * 0.06}s`}}><button className={`mobile-menu-accordion ${mGame ? 'expanded' : ''}`} onClick={() => setMGame((o) => !o)}><span className="mobile-menu-accordion-label"><svg className="mm-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2800" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h4M14 12h4" /></svg> Игры</span><svg className={`mm-chevron ${mGame ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2800" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg></button><div className={`mobile-menu-sub ${mGame ? 'open' : ''}`}>{games.map((g) => <button className={g.id === gameId ? 'active' : ''} onClick={() => { onGameSelect(g.id); closeMobile(); }} key={g.id}>{g.name}<span>{g.detail}</span></button>)}</div></div>;
              if (item === 'Команда') return <div key={item} className="mobile-menu-item" style={{animationDelay: `${i * 0.06}s`}}><button className={`mobile-menu-accordion ${mTeam ? 'expanded' : ''}`} onClick={() => setMTeam((o) => !o)}><span className="mobile-menu-accordion-label"><svg className="mm-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2800" strokeWidth="1.5"><circle cx="9" cy="7" r="3" /><circle cx="15" cy="7" r="3" /><path d="M3 21v-2a4 4 0 014-4h2" /><path d="M21 21v-2a4 4 0 00-4-4h-2" /></svg> Команда</span><svg className={`mm-chevron ${mTeam ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2800" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg></button><div className={`mobile-menu-sub ${mTeam ? 'open' : ''}`}>{drivers.map((d) => <button className={d.id === driverId ? 'active' : ''} onClick={() => { onTeamSelect(d.id); closeMobile(); }} key={d.id}>{d.name}<span>{d.role}</span></button>)}</div></div>;
              return <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={closeMobile} key={item} className="mobile-menu-link" style={{animationDelay: `${i * 0.06}s`}}><span className="mm-link-dot" />{item}</a>;
            })}
          </nav>
          <div className="mobile-menu-panel-footer">
            <span>MUGELLO 5.245</span>
            <span>v1.0</span>
          </div>
        </div>
      </div>}
    </>
  );
}