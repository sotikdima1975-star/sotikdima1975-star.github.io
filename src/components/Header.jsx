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
        {mobileMenuOpen && <div className="mobile-overlay">
          <div className="mobile-header"><span>СайтСотика</span><button onClick={closeMobile}>✕</button></div>
          {navigation.map((item) => {
            if (item === 'Игры') return <div key={item}><div className={`mobile-title ${mGame ? 'exp' : ''}`} onClick={() => setMGame((o) => !o)}><span>🎮 {item}</span><i>{mGame ? '−' : '+'}</i></div>{mGame && games.map((g) => <button className={g.id === gameId ? 'sel' : ''} onClick={() => { onGameSelect(g.id); closeMobile(); }} key={g.id}><b>{g.name}</b><small>{g.detail}</small></button>)}</div>;
            if (item === 'Команда') return <div key={item}><div className={`mobile-title ${mTeam ? 'exp' : ''}`} onClick={() => setMTeam((o) => !o)}><span>👥 {item}</span><i>{mTeam ? '−' : '+'}</i></div>{mTeam && drivers.map((d) => <button className={d.id === driverId ? 'sel' : ''} onClick={() => { onTeamSelect(d.id); closeMobile(); }} key={d.id}><b>{d.name}</b><span>{d.role}</span></button>)}</div>;
            return <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={closeMobile} key={item}>· {item}</a>;
          })}
        </div>}
        {gameMenuOpen && !mobileMenuOpen && <div className="game-menu-dropdown">{games.map((item) => <button className={item.id === gameId ? 'selected' : ''} onClick={() => onGameSelect(item.id)} key={item.id}><b>{item.name}</b><small>{item.number} / {item.detail}</small></button>)}</div>}
        {teamMenuOpen && !mobileMenuOpen && <div className="team-menu-dropdown">{drivers.map((item) => <button className={item.id === driverId ? 'selected' : ''} onClick={() => onTeamSelect(item.id)} key={item.id}><b>{item.initials}</b><strong>{item.name}</strong><span>{item.role}</span></button>)}</div>}
      </nav>
    </>
  );
}