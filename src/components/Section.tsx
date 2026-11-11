import { useEffect, useRef, type ReactNode } from 'react';

const labels: Record<string, string> = {
  patent: '새로운 차별점', reactions: '소비자의 시선', perception: '브랜드 포지셔닝',
  consult: '제품에서 시작하는 상담', pricing: 'IP 마케팅 패키지', expertise: '함께하는 전문가',
  process: '진행 과정', problem: '비슷한 시장, 다른 접근', deliverables: '실제 결과물',
  examples: '광고와 상세페이지 적용', results: '실제 적용 결과', eligibility: '함께할 수 있는 브랜드', apply: '다음은 대표님 브랜드입니다',
};
export function Section({ id, theme = 'light', className = '', children, nodeId }: {
  id: string; theme?: 'light' | 'soft' | 'dark'; className?: string; children: ReactNode; nodeId: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current!;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const headings = Array.from(section.querySelectorAll<HTMLElement>('.section-title, .solution__title, .results__title'));
    const accents = Array.from(section.querySelectorAll<HTMLElement>('.text-shimmer, .consumer-dots'));
    const targets = [...new Set([...headings, ...accents])];
    if (id === 'intro' || motion.matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('is-highlighted');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.1 });
    headings.forEach(target => target.classList.add('reveal-pending'));
    targets.forEach(target => observer.observe(target));
    const showAll = () => { if (motion.matches) { targets.forEach(target => target.classList.remove('reveal-pending')); observer.disconnect(); } };
    motion.addEventListener('change', showAll);
    return () => { targets.forEach(target => target.classList.remove('reveal-pending', 'is-highlighted')); observer.disconnect(); motion.removeEventListener('change', showAll); };
  }, [id]);
  return <section ref={ref} id={id} className={`section section--${theme} ${className}`} data-figma-node={nodeId}>
    <div className="container section__inner">{labels[id] && <p className="section-index">{labels[id]}</p>}{children}</div>
  </section>;
}
