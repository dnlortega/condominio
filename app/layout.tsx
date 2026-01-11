import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recanto dos Pássaros | Residencial de Luxo em Bauru",
  description: "Descubra o Residencial Recanto dos Pássaros: um refúgio exclusivo que redefine o alto padrão e luxo em Bauru. Plantas inteligentes, segurança 24h e localização privilegiada.",
  keywords: ["Recanto dos Pássaros", "Residencial Bauru", "Apartamento de Luxo Bauru", "Condomínio Bauru", "Imóveis Bauru", "DNL Imóveis", "Daniel Ortega Pereira"],
  authors: [{ name: "Daniel Ortega Pereira" }],
  openGraph: {
    title: "Recanto dos Pássaros | Residencial de Luxo em Bauru",
    description: "O melhor do alto padrão em Bauru. Conheça as plantas e agende uma visita.",
    type: "website",
    locale: "pt_BR",
    url: "https://recantopassaros.vercel.app/", // Exemplo de URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased font-sans bg-background text-foreground transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
