import type { ToolStatus } from '@/data/tools';

const config: Record<ToolStatus, { dot: string; text: string; label: string }> = {
  live: {
    dot: 'bg-lime shadow-[0_0_6px_rgba(0,223,255,0.5)]',
    text: 'text-grad',
    label: 'Live',
  },
  beta: {
    dot: 'bg-lime opacity-60',
    text: 'text-muted',
    label: 'Beta',
  },
  'coming-soon': {
    dot: 'bg-muted/40',
    text: 'text-muted',
    label: 'Coming soon',
  },
};

export default function ToolStatusBadge({ status }: { status: ToolStatus }) {
  const c = config[status];
  return (
    <div className="inline-flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      <span className={`text-[10px] font-bold tracking-[0.1em] uppercase ${c.text}`}>
        {c.label}
      </span>
    </div>
  );
}
