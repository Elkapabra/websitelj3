import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "SDN LOJI 3 KOTA BOGOR",
    template: "%s | SDN LOJI 3 KOTA BOGOR",
  },
  description: "Website Resmi SD Negeri Loji 3 Kota Bogor. Wadah pembelajaran yang aman, bermakna, dan menyenangkan untuk menumbuhkan potensi terbaik anak.",
  keywords: [
    "SDN Loji 3",
    "SDN Loji 3 Kota Bogor",
    "SD Negeri Loji 3",
    "Sekolah Dasar Bogor",
    "SD Loji 3",
    "Pendidikan Bogor",
    "SD Terbaik di Bogor",
    "Sekolah Loji"
  ],
  authors: [{ name: "SDN Loji 3 Bogor" }],
  creator: "PancakaLabs",
  publisher: "SDN Loji 3 Kota Bogor",
  metadataBase: new URL("https://websiteloji.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoLB1rWDMb0WBuICnYTqtihgeeuwlIvVuD6J29EVzoBySJimcle4JuB7lELj99EU1PhIGgCrlgDVfGLD3llV-LS4jeZyB4HthTLVhKokp3NDGSlZv3-V2NAiPcT1H5DoP1z8UT6ubcQPeVhBlWPpUYxmRyKlDRefVImJ4vTlPKh_3qbKe7us1EVfJKO9C7/s16000/sasku-icon.png?v=2",
    shortcut: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoLB1rWDMb0WBuICnYTqtihgeeuwlIvVuD6J29EVzoBySJimcle4JuB7lELj99EU1PhIGgCrlgDVfGLD3llV-LS4jeZyB4HthTLVhKokp3NDGSlZv3-V2NAiPcT1H5DoP1z8UT6ubcQPeVhBlWPpUYxmRyKlDRefVImJ4vTlPKh_3qbKe7us1EVfJKO9C7/s16000/sasku-icon.png?v=2",
    apple: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoLB1rWDMb0WBuICnYTqtihgeeuwlIvVuD6J29EVzoBySJimcle4JuB7lELj99EU1PhIGgCrlgDVfGLD3llV-LS4jeZyB4HthTLVhKokp3NDGSlZv3-V2NAiPcT1H5DoP1z8UT6ubcQPeVhBlWPpUYxmRyKlDRefVImJ4vTlPKh_3qbKe7us1EVfJKO9C7/s16000/sasku-icon.png?v=2",
  },
  openGraph: {
    type: "website",
    title: "SDN LOJI 3 KOTA BOGOR",
    description: "Website Resmi SD Negeri Loji 3 Kota Bogor. Wadah pembelajaran yang aman, bermakna, dan menyenangkan untuk menumbuhkan potensi terbaik anak.",
    url: "https://websiteloji.vercel.app",
    siteName: "SDN Loji 3 Kota Bogor",
    locale: "id_ID",
    images: [
      {
        url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoLB1rWDMb0WBuICnYTqtihgeeuwlIvVuD6J29EVzoBySJimcle4JuB7lELj99EU1PhIGgCrlgDVfGLD3llV-LS4jeZyB4HthTLVhKokp3NDGSlZv3-V2NAiPcT1H5DoP1z8UT6ubcQPeVhBlWPpUYxmRyKlDRefVImJ4vTlPKh_3qbKe7us1EVfJKO9C7/s16000/sasku-icon.png",
        width: 1200,
        height: 630,
        alt: "Logo SDN Loji 3 Kota Bogor",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SDN LOJI 3 KOTA BOGOR",
    description: "Website Resmi SD Negeri Loji 3 Kota Bogor. Wadah pembelajaran yang aman, bermakna, dan menyenangkan untuk menumbuhkan potensi terbaik anak.",
    images: ["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoLB1rWDMb0WBuICnYTqtihgeeuwlIvVuD6J29EVzoBySJimcle4JuB7lELj99EU1PhIGgCrlgDVfGLD3llV-LS4jeZyB4HthTLVhKokp3NDGSlZv3-V2NAiPcT1H5DoP1z8UT6ubcQPeVhBlWPpUYxmRyKlDRefVImJ4vTlPKh_3qbKe7us1EVfJKO9C7/s16000/sasku-icon.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  "name": "SDN LOJI 3 KOTA BOGOR",
  "alternateName": "SDN Loji 3",
  "url": "https://websiteloji.vercel.app",
  "logo": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtPHqufDTHtf9rny0ccng_oIebm_iQP4-7NAv4_ofQ4ewit8gCmjASFaaW3KoMLM9-Ekq0IiU63LCFrb5-0U0xAuZlff727HQj24v3svnSjR7maQ0nFkpZG4s5srnuC7YH2cJ4kGSw_YYurv9kA-4NRGA5wAIFMiidRXjSUPWxCF8I_mCz55lYQcuhPyse/s72-rw/Logo%20Loji%203.png",
  "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtPHqufDTHtf9rny0ccng_oIebm_iQP4-7NAv4_ofQ4ewit8gCmjASFaaW3KoMLM9-Ekq0IiU63LCFrb5-0U0xAuZlff727HQj24v3svnSjR7maQ0nFkpZG4s5srnuC7YH2cJ4kGSw_YYurv9kA-4NRGA5wAIFMiidRXjSUPWxCF8I_mCz55lYQcuhPyse/s72-rw/Logo%20Loji%203.png",
  "description": "SDN Loji 3 Kota Bogor hadir sebagai ruang belajar yang aman, bermakna, dan menumbuhkan potensi setiap anak.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Loji Kp No.136, RT.05/RW.05, Loji",
    "addressLocality": "Bogor Barat",
    "addressRegion": "Kota Bogor, Jawa Barat",
    "postalCode": "16117",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-6.5944",
    "longitude": "106.7892"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "sdnegeriloji3@gmail.com",
    "contactType": "customer service"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect links for optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://blogger.googleusercontent.com" crossOrigin="anonymous" />
        
        {/* FontAwesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
