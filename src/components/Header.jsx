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
        <button className={`mobile-game-btn ${mobileMenuOpen ? 'active' : ''}`} onClick={onMobileMenu} aria-label="Меню">☰</button>
        {gameMenuOpen && !mobileMenuOpen && <div className="game-menu-dropdown">{games.map((item) => <button className={item.id === gameId ? 'selected' : ''} onClick={() => onGameSelect(item.id)} key={item.id}><b>{item.name}</b><small>{item.number} / {item.detail}</small></button>)}</div>}
        {teamMenuOpen && !mobileMenuOpen && <div className="team-menu-dropdown">{drivers.map((item) => <button className={item.id === driverId ? 'selected' : ''} onClick={() => onTeamSelect(item.id)} key={item.id}><b>{item.initials}</b><strong>{item.name}</strong><span>{item.role}</span></button>)}</div>}
      </nav>
      {mobileMenuOpen && <div className="mobile-overlay">
        <div className="mobile-overlay-inner">
          <div className="mobile-overlay-top">
            <span className="mobile-overlay-logo">СайтСотика</span>
            <button className="mobile-overlay-close" onClick={closeMobile}>✕</button>
          </div>
          <div className="mobile-overlay-divider" />
          <div className="mobile-overlay-nav">
            {navigation.map((item) => {
              if (item === 'Игры') return <div key={item} className="mobile-overlay-group"><div className={`mobile-overlay-title ${mGame ? 'open' : ''}`} onClick={() => setMGame((o) => !o)}><span className="mobile-overlay-label"><span className="mobile-overlay-icon">🎮</span> {item}</span><span className="mobile-overlay-arrow">{mGame ? '−' : '+'}</span></div>{mGame && <div className="mobile-overlay-sub">{games.map((g) => <button className={g.id === gameId ? 'selected' : ''} onClick={() => { onGameSelect(g.id); closeMobile(); }} key={g.id}><span className="sub-name">{g.name}</span><span className="sub-desc">{g.detail}</span></button>)}</div>}</div>;
              if (item === 'Команда') return <div key={item} className="mobile-overlay-group"><div className={`mobile-overlay-title ${mTeam ? 'open' : ''}`} onClick={() => setMTeam((o) => !o)}><span className="mobile-overlay-label"><span className="mobile-overlay-icon">👥</span> {item}</span><span className="mobile-overlay-arrow">{mTeam ? '−' : '+'}</span></div>{mTeam && <div className="mobile-overlay-sub">{drivers.map((d) => <button className={d.id === driverId ? 'selected' : ''} onClick={() => { onTeamSelect(d.id); closeMobile(); }} key={d.id}><span className="sub-name">{d.name}</span><span className="sub-desc">{d.role}</span></button>)}</div>}</div>;
              return <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={closeMobile} key={item} className="mobile-overlay-link"><span className="mobile-overlay-label"><span className="mobile-overlay-icon">·</span> {item}</span></a>;
            })}
          </div>
        </div>
      </div>}
    </>
  );
}