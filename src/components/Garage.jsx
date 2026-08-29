import { cars } from '../data/cars/index.js';

export default function Garage({ gameId = 'fm7', driverId = 'sotik' }) {
  const gameCars = cars[gameId];
  const driverCars = gameCars ? gameCars[driverId] : [];

  return <section className="section garage" id="гараж"><div className="section-intro"><span>02 / GARAGE</span><h2>FERRARI<br /><em>ARCHIVE</em></h2><p>Машины, которые стали частью истории. Каждая с характером, каждая готова к трассе.</p></div><div className="car-grid">{driverCars.map((car) => <article className="car-card" key={car.name}><div className="car-art"><img src={`/images/${car.image}`} alt={car.name} onError={(event) => { event.currentTarget.style.display = 'none'; }} /><span>Ferrari</span></div><header><span>{car.tag}</span><b>{car.year}</b></header><h3>{car.name}</h3><p>{car.spec}</p><small>{car.color}</small><button>VIEW SPEC <b>↗</b></button></article>)}</div></section>;
}
