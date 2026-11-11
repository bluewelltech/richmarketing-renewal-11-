import { packages } from '../data';

export function Pricing() {
  return <div className="pricing-grid" role="group" aria-label="IP 마케팅 패키지 가격">
    {packages.map(item => <article key={item.count}
      aria-label={`${item.count}건 ${item.price}만원${item.count > 1 ? `씩, 총 ${item.total}만원` : ''}`}
      className={`pricing-card ${item.count === 4 ? 'pricing-card--recommended' : ''}`}>
      <div className="pricing-card__topline">
        <span className="pricing-card__label">{item.label}</span>
        <svg className="pricing-card__icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          {item.count > 1 && <path d="M9 5V3h17v23h-2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />}
          <path d="M6 7h17v23H6V7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M11 13h7m-7 5h7m-7 5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <span className="pricing-card__title">{item.title}</span>
      <div className="pricing-card__amount">
        <span className="pricing-card__price"><span>{item.price}</span><span className="pricing-card__unit">만원</span></span>
        <span className="pricing-card__basis">{item.count === 1 ? '특허소재 1건' : `건당 금액 × ${item.count}건`}</span>
      </div>
      <span className="pricing-card__footer">
        <span className="pricing-card__summary">{item.count === 1 ? '단품 구성' : `${item.count}건 패키지`}</span>
        <span className="pricing-card__total">{item.count === 1 ? '1건 기준' : `총 ${item.total}만원`}</span>
      </span>
    </article>)}
  </div>;
}
