import { useEffect, useRef, useState } from 'react';
import { tracks } from '../data/tracks/index.js';
import { setups } from '../data/setups/index.js';

export default function Hero({ game, driver, track, onTrackChange }) {
  const isCarVisible = game.id === 'fm2023' && driver.id === 'assmaster';
  const [trackOpen, setTrackOpen] = useState(false);
  const [showTune, setShowTune] = useState(false);
  const ref = useRef(null);
  const setup = setups[track.id] ?? setups['mugello-gp'];

  useEffect(() => {
    function handleClick(e) {
      if (trackOpen && ref.current && !ref.current.contains(e.target)) setTrackOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [trackOpen]);

  return <section className="hero" id="top">
    <div className="hero-location">MUGELLO</div>
    <div className="hero-copy"><span className="kicker">Главная • Pit Lane Open</span><h1>Добро пожаловать<br />на <em>СайтСотика</em></h1><p>гоночная империя FSB Sotik, Mugello Circuit, коллекция Ferrari. Трон, шлем Bell с поднятым визором, стримы, донаты и гараж мечты — всё здесь, в боксах Маранелло.</p><span className="status">Статус: В боксах • Готов к старту</span></div>
    <div className="dashboard"><span className="label">ТЕКУЩАЯ ИГРА:</span><b className="live">ACTIVE</b><strong><i>{game.number}</i> {game.name}</strong><small>{game.detail}</small><div className="dashboard-row"><div ref={ref}><span>Трасса</span><b className="track-selector" onClick={() => setTrackOpen((o) => !o)}>{track.name} <i>▼</i></b><small>{track.length}</small>{trackOpen && <div className="track-dropdown">{tracks.map((t) => <button className={t.id === track.id ? 'selected' : ''} onClick={() => { onTrackChange(t.id); setTrackOpen(false); }} key={t.id}>{t.name}<small>{t.length}</small></button>)}</div>}</div><div className="driver"><span>Пилот</span><b>{driver.initials}</b><strong>{driver.name}</strong><small>{driver.role}</small></div></div></div>
    {isCarVisible && <div className="car-card-hero">
      <div className="gt3-art"><img src="/images/ferrari-gt3-hero.png" alt="Ferrari 488 GT3 Toro Rosso" onError={(e) => { e.currentTarget.style.display = 'none'; }} /></div>
      <div className="car-specs">
        <div className="spec-header">Ferrari 488 GT3 Toro Rosso
          <div className="spec-tabs">
            <button className={`spec-tab ${!showTune ? 'active' : ''}`} onClick={() => setShowTune(false)}>📋</button>
            <button className={`spec-tab ${showTune ? 'active' : ''}`} onClick={() => setShowTune(true)}>⚙</button>
          </div>
        </div>
        {showTune ? <div className="tune-panel"><div className="tune-grid">
          <div><span>Давление</span><b>П {setup.pressure.front.toFixed(2)}</b><b>З {setup.pressure.rear.toFixed(2)}</b></div>
          <div><span>Развал</span><b>П {setup.camber.front}</b><b>З {setup.camber.rear}</b></div>
          <div><span>Схождение</span><b>П {setup.toe.front}</b><b>З {setup.toe.rear}</b></div>
          <div><span>Кастер</span><b>{setup.caster.front}</b></div>
          <div><span>Стабилизаторы</span><b>П {setup.swayBar.front}</b><b>З {setup.swayBar.rear}</b></div>
          <div><span>Пружины</span><b>П {setup.springs.front}</b><b>З {setup.springs.rear}</b></div>
          <div><span>Клиренс</span><b>П {setup.rideHeight.front}</b><b>З {setup.rideHeight.rear}</b></div>
          <div><span>Отбой</span><b>П {setup.rebound.front}</b><b>З {setup.rebound.rear}</b></div>
          <div><span>Сжатие</span><b>П {setup.bump.front}</b><b>З {setup.bump.rear}</b></div>
          <div><span>Аэродинамика</span><b>П {setup.aero.front}</b><b>З {setup.aero.rear}</b></div>
          <div><span>Торможение</span><b>{setup.brake.balance}%</b><b>{setup.brake.force}%</b></div>
          <div><span>Дифференциал</span><b>Уск {setup.diff.accel}%</b><b>Зам {setup.diff.decel}%</b></div>
        </div></div> : <>
          <div className="spec-row"><span>Двигатель</span><b>V8 Twin-Turbo • 550 л.с.</b></div>
          <div className="spec-row"><span>Объём</span><b>3.9 л • 700 Нм</b></div>
          <div className="spec-row"><span>Трансмиссия</span><b>Sequential 6‑ступ.</b></div>
          <div className="spec-row"><span>Привод</span><b>RWD</b></div>
          <div className="spec-row"><span>Вес</span><b>1265 кг</b></div>
          <div className="spec-row"><span>0‑100</span><b>3.0 с</b></div>
          <div className="spec-row"><span>Макс. скорость</span><b>290 км/ч</b></div>
        </>}
        <div className="best-lap-section">
          <div className="spec-header">BEST LAP</div>
          <div className="spec-row"><span>Время</span><b>{track.bestLap}</b></div>
          <div className="spec-row"><span>Автомобиль</span><b>Ferrari 488 GT3</b></div>
          <div className="spec-row"><span>Трасса</span><b>MUGELLO</b></div>
        </div>
      </div>
    </div>}
  </section>;
}