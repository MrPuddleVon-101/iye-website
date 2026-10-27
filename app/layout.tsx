import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import './home.css';
import './pages.css';
import { Loader } from '@/components/site/Loader';
import { Cursor } from '@/components/site/Cursor';
import { SmoothScroll } from '@/components/site/SmoothScroll';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { Reveals } from '@/components/site/Reveals';
import { site } from '@/content/site';
import { asset } from '@/lib/asset';

// One variable family, used across its width axis: expanded and heavy for
// headlines, condensed for figures, normal width for reading.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--f' });

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.schoolShort}`, template: `%s | ${site.short}` },
  description: site.statement,
  icons: { icon: asset('/img/brand/iye-mark-light.png') },
  openGraph: { title: site.name, description: site.heroSub, images: [asset('/img/brand/iye-logo.png')] },
};

export const viewport: Viewport = { themeColor: '#050a1c' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={archivo.variable} data-motion="on" suppressHydrationWarning>
      <head>
        {/* Mark JS before first paint so reveal styles never hide content for no-JS visitors. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Loader />
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Reveals />
      </body>
    </html>
  );
}
