import { useEffect, useRef, useState } from 'react';
import { ConsultLink } from './ConsultLink';
import { BrandLockup } from './BrandLockup';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('keydown', escape); };
  }, [open]);
  return <header className="site-header" ref={header}>
    <a className="brand" href="#intro" aria-label="리치마케팅 처음으로" onClick={() => setOpen(false)}>
      <BrandLockup />
    </a>
    <nav id="site-navigation" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="주요 메뉴">
      <a href="#patent" onClick={() => setOpen(false)}>서비스 소개</a>
      <a href="#results" onClick={() => setOpen(false)}>적용 사례</a>
      <a href="#process" onClick={() => setOpen(false)}>진행 과정</a>
      <a href="#pricing" onClick={() => setOpen(false)}>가격 안내</a>
    </nav>
    <ConsultLink compact />
    <button ref={toggle} type="button" className="nav-toggle" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>
      <span /><span /><span />
    </button>
  </header>;
}
