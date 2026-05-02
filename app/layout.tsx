import Script from "next/script";

const ADSENSE_ID = "ca-pub-9682866993240569";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
