import { useEffect } from 'react';
import { navigation } from '../data/tracks/index.js';
import { games } from '../data/games/index.js';
import { drivers } from '../data/pilots/index.js';

export default function Header({ onGameMenu, gameMenuOpen, onTeamMenu, teamMenuOpen, gameId, onGameSelect, driverId, onTeamSelect, mobileMenuOpen, onMobileMenu, setMobileMenuOpen }) {
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e) {
      if (e.target.closest('.mobile-overlay')) setMobileMenuOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="top-line" />
      <header className="utility-bar"><span className="checker" /> MUGELLO CIRCUIT <b>• SCUDERIA</b><span className="utility-right">MUGELLO 5.245</span></header>
      <nav className="main-nav">
        <a className="logo" href="#top"><span>СайтСотика</span><small>ГОНОЧНАЯ ИМПЕРИЯ</small></a>
        <div className="nav-links">{navigation.map((item, index) => {
          if (item === 'Игры') {
            return <a className={`game-trigger ${gameMenuOpen ? 'active' : ''}`} href="#игры" onClick={(e) => { e.preventDefault(); onGameMenu(); }} key={item}>{item}</a>;
          }
          if (item === 'Команда') {
            return <a className={`team-trigger ${teamMenuOpen ? 'active' : ''}`} href="#команда" onClick={(e) => { e.preventDefault(); onTeamMenu(); }} key={item}>{item}</a>;
          }
          return <a className={index === 0 ? 'active' : ''} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>{item}</a>;
        })}</div>
        <button className={`mobile-game-btn ${mobileMenuOpen ? 'active' : ''}`} onClick={onMobileMenu} aria-label="Меню">☰</button>
        {mobileMenuOpen && <div className="mobile-overlay">
          <div className="mobile-overlay-header">
            <span className="mobile-overlay-logo">СайтСотика</span>
            <button className="mobile-overlay-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>
          <div className="mobile-overlay-body">
            {navigation.map((item, index) => {
              if (item === 'Игры') return <div key={item} className="mobile-overlay-section"><div className={`mobile-overlay-title ${gameMenuOpen ? 'expanded' : ''}`} onClick={onGameMenu}><span>🎮 {item}</span><i>{gameMenuOpen ? '−' : '+'}</i></div>{gameMenuOpen && <div className="mobile-overlay-sublist">{games.map((g) => <button className={g.id === gameId ? 'selected' : ''} onClick={() => { onGameSelect(g.id); setMobileMenuOpen(false); }} key={g.id}><b>{g.name}</b><small>{g.detail}</small></button>)}</div>}</div>;
              if (item === 'Команда') return <div key={item} className="mobile-overlay-section"><div className={`mobile-overlay-title ${teamMenuOpen ? 'expanded' : ''}`} onClick={onTeamMenu}><span>👥 {item}</span><i>{teamMenuOpen ? '−' : '+'}</i></div>{teamMenuOpen && <div className="mobile-overlay-sublist">{drivers.map((d) => <button className={d.id === driverId ? 'selected' : ''} onClick={() => { onTeamSelect(d.id); setMobileMenuOpen(false); }} key={d.id}><b>{d.name}</b><span>{d.role}</span></button>)}</div>}</div>;
              return <a className={index === 0 ? 'active' : ''} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMobileMenuOpen(false)} key={item}><span>· {item}</span></a>;
            })}
          </div>
        </div>
        {gameMenuOpen && !mobileMenuOpen && <div className="game-menu-dropdown">{games.map((item) => <button className={item.id === gameId ? 'selected' : ''} onClick={() => onGameSelect(item.id)} key={item.id}><b>{item.name}</b><small>{item.number} / {item.detail}</small></button>)}</div>}
        {teamMenuOpen && !mobileMenuOpen && <div className="team-menu-dropdown">{drivers.map((item) => <button className={item.id === driverId ? 'selected' : ''} onClick={() => onTeamSelect(item.id)} key={item.id}><b>{item.initials}</b><strong>{item.name}</strong><span>{item.role}</span></button>)}</div>}
      </nav>
    </>
  );
}