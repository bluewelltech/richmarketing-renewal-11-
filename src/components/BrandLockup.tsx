import lawmunLogo from '../assets/lawmun-original.png?inline';

export function BrandLockup() {
  return <>
    <span className="brand-lockup__tagline">
      <span>특허출원 기반</span>{' '}<span>프리미엄 차별화 마케팅</span>
    </span>
    <span className="brand-lockup__divider" aria-hidden="true" />
    <img className="brand-lockup__lawmun" src={lawmunLogo} width="2172" height="724" alt="로문 특허법률사무소 · Lawmun IP Law Firm" />
  </>;
}
