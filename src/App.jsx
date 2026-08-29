import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Garage from './components/Garage.jsx';
import Pilots from './components/Pilots.jsx';
import Tracks from './components/Tracks.jsx';
import Ticker from './components/Ticker.jsx';
import Cover from './components/Cover.jsx';
import useAppState from './useAppState.js';

export default function App() {
  const {
    gameId, driverId, trackId, game, driver, track,
    loading, gameMenuOpen, teamMenuOpen,
    setTrackId, setDriverId, handleGameSelect, handleTeamSelect,
    setGameMenuOpen, setTeamMenuOpen,
  } = useAppState();

  return <main className="site-shell">
    <Cover />
    <div className={`loading-screen ${loading ? '' : 'hidden'}`}><span /> ЗАГРУЗКА</div>
    <section className="site-page">
      <Header gameMenuOpen={gameMenuOpen} onGameMenu={() => { setTeamMenuOpen(false); setGameMenuOpen((open) => !open); }} teamMenuOpen={teamMenuOpen} onTeamMenu={() => { setGameMenuOpen(false); setTeamMenuOpen((open) => !open); }} gameId={gameId} onGameSelect={handleGameSelect} driverId={driverId} onTeamSelect={handleTeamSelect} />
      <Hero game={game} driver={driver} track={track} onTrackChange={setTrackId} />
      <Garage gameId={gameId} driverId={driverId} />
      <Pilots activeId={driverId} onChange={setDriverId} />
      <Tracks />
      <Ticker />
    </section>
    <div className="live-pill"><i /> LIVE <b>1.2K</b></div>
  </main>;
}