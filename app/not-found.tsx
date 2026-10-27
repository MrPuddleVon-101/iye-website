import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="lost">
      <p className="lost__code" aria-hidden>
        404
      </p>
      <h1 className="h-xl">Market failure.</h1>
      <p className="lede">There is no demand for this page, and no supply either.</p>
      <Link href="/" className="btn btn--lime" data-cursor="Home">
        Back to the economy
      </Link>
    </section>
  );
}
