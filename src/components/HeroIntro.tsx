import { useEffect, useRef, useState } from 'react';
import { ConsultLink } from './ConsultLink';

const messages = [
  {
    title: <>비슷해 보이는 제품에<br /><em>특허출원</em>이라는 차이를.</>,
    description: <>제품 속 차별화 포인트를 발굴하고,<br />{' '}광고와 상세페이지에 활용할 특허출원 소재로 발굴합니다.</>,
  },
  {
    title: <>특허출원 기반<br /><em>“전략형 IP 마케팅”</em></>,
    description: <>지금 바로 광고와 상세페이지에 활용할 수 있는<br />{' '}특허출원 전략으로 제품의 경쟁력을 높입니다.</>,
  },
  {
    title: <>평범한 제품도,<br /><em>특허출원</em>으로 특별하게.</>,
    description: <>우리 제품만의 기술적 차별점을 특허로 구체화하여,<br />{' '}소비자에게 전달할 수 있는 브랜드의 경쟁력으로 만듭니다.</>,
  },
];

export function HeroIntro() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(root.current!);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!visible || !pageVisible) return;
    const timer = window.setTimeout(() => setActive(index => (index + 1) % messages.length), 2000);
    return () => window.clearTimeout(timer);
  }, [active, visible, pageVisible]);

  return <div ref={root} className="hero-stage" role="region" aria-roledescription="캐러셀" aria-label="메인 소개 문구">
    <p className="hero-badge"><span aria-hidden="true" />특허출원 기반 IP 마케팅</p>
    <div className="hero-copy" aria-live="off">
      {messages.map((message, index) => {
        // Inactive panels still size the grid, but only the current message is a page heading.
        const Title = active === index ? 'h1' : 'div';
        return <div key={index} id={`hero-message-${index + 1}`} className={`hero-copy__slide ${active === index ? 'is-active' : ''}`}
          role="group" aria-roledescription="슬라이드" aria-label={`${index + 1}/${messages.length}`}
          aria-hidden={active !== index} inert={active !== index}>
          <Title className="hero-title">{message.title}</Title>
          <p className="hero__sub">{message.description}</p>
        </div>;
      })}
    </div>
    <ConsultLink />
    <a className="hero-secondary" href="#deliverables">실제 결과물 살펴보기 <span aria-hidden="true">↓</span></a>
  </div>;
}
