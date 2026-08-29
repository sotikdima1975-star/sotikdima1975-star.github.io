import { tickerMessages } from '../data/ticker/index.js';

export default function Ticker() {
  const messages = [...tickerMessages, ...tickerMessages];
  return <footer className="ticker"><div className="ticker-track">{messages.map((message, index) => <span key={`${message}-${index}`}>{message}<b>●</b></span>)}</div></footer>;
}
