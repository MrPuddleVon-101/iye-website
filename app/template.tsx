import { asset } from '@/lib/asset';

// Re-mounts on every navigation, so each route gets a curtain wipe and its
// own entrance. The first load is covered by the Loader instead.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden>
        <span />
        <img src={asset('/img/brand/iye-mark-navy.png')} alt="" width={84} height={84} />
      </div>
      <div className="page">{children}</div>
    </>
  );
}
