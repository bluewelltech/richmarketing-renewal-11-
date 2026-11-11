import lawmunLogo from '../assets/lawmun-original.png?inline';

export function BrandLockup() {
  return <>
    <span className="brand-lockup__rich">
      <span className="brand-lockup__wordmark">
        <svg className="brand-lockup__symbol" viewBox="0 0 24 32" fill="none" aria-hidden="true">
          <path d="M2 8 18 3v24L2 31V8Z" fill="#1559eb" />
          <path d="m18 3 4-2v25l-4 1V3Z" fill="#76aaff" />
          <path d="m2 8 16-5v5L2 13V8Z" fill="#4484f5" />
        </svg>
        <strong>RICH MARKETING</strong>
      </span>
      <span className="brand-lockup__tagline">특허출원 기반 프리미엄 차별화 마케팅</span>
    </span>
    <span className="brand-lockup__divider" aria-hidden="true" />
    <img className="brand-lockup__lawmun" src={lawmunLogo} width="2172" height="724" alt="로문 특허법률사무소 · Lawmun IP Law Firm" />
  </>;
}
