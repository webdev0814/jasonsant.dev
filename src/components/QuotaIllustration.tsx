export function QuotaIllustration() {
  return (
    <figure className="quota-figure">
      <svg className="quota-illustration" viewBox="0 0 900 490" role="img" aria-labelledby="quota-title quota-description">
        <title id="quota-title">Abstract AI quota dashboard</title>
        <desc id="quota-description">Six illustrative cards labeled Tool A through Tool F. Values are redacted with solid bars. Tool F shows an Unknown state with a dashed gauge.</desc>
        <rect x="0.5" y="0.5" width="899" height="489" fill="var(--muted)" stroke="var(--border)" />
        {["A", "B", "C", "D", "E", "F"].map((label, index) => {
          const unknown = index === 5
          const x = 24 + (index % 3) * 288
          const y = 24 + Math.floor(index / 3) * 229
          const color = index === 2 ? "var(--amber)" : index === 1 || index === 4 ? "var(--blueprint)" : "var(--signal)"
          return (
            <g key={label} transform={`translate(${x} ${y})`}>
              <rect width="276" height="217" fill="var(--white)" stroke="var(--border)" />
              <text x="20" y="31" fill="var(--foreground)" fontFamily="var(--font-code)" fontSize="14">Tool {label}</text>
              <path d="M 54 140 A 84 84 0 0 1 222 140" fill="none" stroke="var(--muted)" strokeWidth="10" />
              <path d="M 54 140 A 84 84 0 0 1 222 140" fill="none" stroke={unknown ? "var(--blueprint)" : color} strokeWidth={unknown ? 3 : 10} strokeDasharray={unknown ? "6 7" : undefined} />
              {unknown ? (
                <text x="138" y="139" textAnchor="middle" fill="var(--blueprint)" fontFamily="var(--font-code)" fontSize="15">Unknown</text>
              ) : (
                <rect x="102" y="124" width="72" height="17" fill="var(--foreground)" />
              )}
              <line x1="20" y1="164" x2="256" y2="164" stroke="var(--border)" />
              <rect x="20" y="184" width="98" height="8" fill="var(--foreground)" />
              <rect x="200" y="184" width="56" height="8" fill="var(--foreground)" />
            </g>
          )
        })}
      </svg>
      <figcaption>Illustration. Provider names, values and hosts removed.</figcaption>
    </figure>
  )
}
