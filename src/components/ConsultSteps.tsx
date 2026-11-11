export function ConsultSteps() {
  return <ol className="consult-steps" aria-label="상담 설계 단계">
    {['제품 분석', '소구점 발굴', '특허명칭·출원방향 제안'].map((text, i) =>
      <li key={text}><span>0{i + 1}</span><strong>{text}</strong></li>)}
  </ol>;
}
