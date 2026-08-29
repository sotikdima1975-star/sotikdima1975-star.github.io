import { useState } from 'react';

export default function Cover() {
  const [helmetVisible, setHelmetVisible] = useState(false);
  const hideMissingImage = (event) => { event.currentTarget.style.display = 'none'; };

  return <>
    <div className="cover">
    <img className="cover-layer cover-base" src="/images/cover-base.jpg" alt="Mugello Circuit" onError={hideMissingImage} />
    <img className={`cover-layer cover-helmet ${helmetVisible ? 'visible' : ''}`} src="/images/cover-helmet.png" alt="Ferrari helmet" onError={hideMissingImage} />
    <div className="cover-fallback" />
    <div className="cover-shade" />
    </div>
    <div className="cover-hover-zone" onMouseEnter={() => setHelmetVisible(true)} onMouseLeave={() => setHelmetVisible(false)} aria-label="Область наведения для шлема" />
  </>;
}
