import { navigation } from '../data/tracks/index.js';

export default function Tracks() {
  return <section className="section tracks" id="tracks"><div className="section-intro"><span>04 / TRACKS</span><h2>THE<br /><em>TRACKS</em></h2></div><div className="tracks-list">{navigation.map((item, idx) => <div key={idx} className="track-item"><b>{item}</b></div>)}</div></section>;
}
