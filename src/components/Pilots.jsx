import { drivers } from '../data/pilots/index.js';

export default function Pilots({ activeId, onChange }) {
  const active = drivers.find((driver) => driver.id === activeId) ?? drivers[0];
  return <section className="section team" id="pilots"><div className="section-intro"><span>03 / PADDOCK</span><h2>PILOTS<br /><em>THE TEAM</em></h2></div><div className="team-list">{drivers.map((driver) => <button className={driver.id === active.id ? 'selected' : ''} onClick={() => onChange(driver.id)} key={driver.id}><b>{driver.initials}</b><strong>{driver.name}</strong><span>{driver.role}</span><i>↗</i></button>)}</div><p className="team-accent">{active.accent}</p></section>;
}
