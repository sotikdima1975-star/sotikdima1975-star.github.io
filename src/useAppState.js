import { useState, useEffect, useCallback } from 'react';
import { drivers } from './data/pilots/index.js';
import { games } from './data/games/index.js';
import { tracks } from './data/tracks/index.js';

export default function useAppState() {
  const [gameId, setGameId] = useState('fm7');
  const [driverId, setDriverId] = useState('sotik');
  const [trackId, setTrackId] = useState('mugello-gp');
  const [gameMenuOpen, setGameMenuOpen] = useState(false);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const game = games.find((item) => item.id === gameId) ?? games[0];
  const driver = drivers.find((item) => item.id === driverId) ?? drivers[0];
  const track = tracks.find((item) => item.id === trackId) ?? tracks[0];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleGameSelect = useCallback((id) => {
    if (id === gameId) { setGameMenuOpen(false); return; }
    setGameId(id);
    setGameMenuOpen(false);
  }, [gameId]);

  const handleTeamSelect = useCallback((id) => {
    if (id === driverId) { setTeamMenuOpen(false); return; }
    setDriverId(id);
    setTeamMenuOpen(false);
  }, [driverId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!gameMenuOpen && !teamMenuOpen) return;
      const nav = event.target.closest('.main-nav');
      if (!nav) { setGameMenuOpen(false); setTeamMenuOpen(false); }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [gameMenuOpen, teamMenuOpen]);

  return {
    gameId, driverId, trackId, game, driver, track,
    loading, gameMenuOpen, teamMenuOpen,
    setTrackId, setDriverId, handleGameSelect, handleTeamSelect,
    setGameMenuOpen, setTeamMenuOpen,
  };
}