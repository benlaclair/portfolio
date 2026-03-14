type VisualType = 'proofer' | 'social' | 'seo';

interface ToolVisualProps {
  type: VisualType;
  accentColor: string;
}

export default function ToolVisual({ type, accentColor }: ToolVisualProps) {
  return (
    <div
      className="bg-surface border border-white/8 rounded-2xl p-6 min-h-[260px] flex flex-col justify-between"
      style={{ boxShadow: `0 0 40px ${accentColor}10, 0 0 80px ${accentColor}05` }}
    >
      {type === 'proofer' && <ProoferVisual color={accentColor} />}
      {type === 'social' && <SocialVisual color={accentColor} />}
      {type === 'seo' && <SeoVisual color={accentColor} />}
    </div>
  );
}

function ProoferVisual({ color }: { color: string }) {
  const issues = [
    { label: 'Logo typo — Page 2', severity: 'Critical' },
    { label: 'Cut-off copy — Page 1', severity: 'High' },
    { label: 'Symbol formatting — Page 3', severity: 'Medium' },
    { label: 'Phone number mismatch', severity: 'High' },
  ];
  return (
    <>
      <p className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-5">
        Proofing report preview
      </p>
      <div className="flex-1 space-y-px">
        {issues.map((i) => (
          <div
            key={i.label}
            className="flex justify-between items-center py-2.5 border-b border-white/5"
          >
            <span className="text-xs text-muted">{i.label}</span>
            <span className="text-xs font-bold" style={{ color }}>{i.severity}</span>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div className="w-full h-1 bg-white/8 relative overflow-hidden rounded-full">
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: '82%', background: color }} />
        </div>
        <p className="text-[10px] text-muted mt-2">4 of 5 issues triaged</p>
      </div>
    </>
  );
}

function SocialVisual({ color }: { color: string }) {
  const posts = [
    { date: 'Mar 3', platform: 'LI', active: true },
    { date: 'Mar 3', platform: 'FB', active: true },
    { date: 'Mar 5', platform: 'IG', active: false },
    { date: 'Mar 7', platform: 'LI', active: true },
    { date: 'Mar 7', platform: 'TK', active: false },
    { date: 'Mar 10', platform: 'FB', active: true },
  ];
  return (
    <>
      <p className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase mb-5">
        Post grid — March 2026
      </p>
      <div className="grid grid-cols-3 gap-2 flex-1">
        {posts.map((p, i) => (
          <div
            key={i}
            className="bg-bg border border-white/5 rounded-lg p-3 aspect-square flex flex-col justify-end"
          >
            <div
              className="h-[3px] mb-1.5 rounded-full"
              style={{ background: p.active ? color : 'rgba(168,181,196,0.2)' }}
            />
            <p className="text-[8px] text-muted">
              {p.date} · {p.platform}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted mt-4">
        30 posts · 4 platforms · ZIP export ready
      </p>
    </>
  );
}

function SeoVisual({ color }: { color: string }) {
  const tabs = ['SEO', 'GEO', 'AEO'];
  const items = [
    { label: 'What is SEO?', open: true },
    { label: 'On-page optimization', open: false },
    { label: 'Schema markup examples', open: false },
  ];
  return (
    <>
      <div className="flex gap-2 mb-5">
        {tabs.map((t, i) => (
          <span
            key={t}
            className="text-[10px] font-bold px-3 py-1.5 rounded-full border"
            style={i === 0 ? { borderColor: color, color } : undefined}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex-1 space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="border border-white/8 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-3 py-2.5 text-xs text-muted">
              {item.label}
              <span className="font-bold" style={{ color }}>{item.open ? '−' : '+'}</span>
            </div>
            {item.open && (
              <p className="px-3 pb-3 text-[10px] text-muted/70 leading-relaxed">
                Convincing search engines your content deserves page one.
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted mt-4">
        15+ code examples · 9 expandable sections
      </p>
    </>
  );
}
