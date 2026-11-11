import { CONSULT_URL } from '../data';

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

export function ConsultLink({ tone = 'blue', compact = false }: { tone?: 'blue' | 'light'; compact?: boolean }) {
  return <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer"
    onClick={() => window.fbq?.('track', 'Lead')}
    className={`consult-link consult-link--${tone} ${compact ? 'consult-link--compact' : ''}`}>
    <span>특허 마케팅 신청하기</span>
    <span className="cta-arrow" aria-hidden="true">→</span>
    <span className="sr-only"> (새 창)</span>
  </a>;
}
