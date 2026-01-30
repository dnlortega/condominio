import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

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
  title: "Recanto dos Pássaros | Portal de Informações",
  description: "Portal oficial de informações do Residencial Recanto dos Pássaros em Bauru. Acesse o regimento interno, convênios e contatos da administração.",
  keywords: ["Recanto dos Pássaros", "Condomínio Bauru", "Regimento Interno", "Administração Condomínio", "Daniel Ortega Pereira"],
  authors: [{ name: "Daniel Ortega Pereira" }],
  openGraph: {
    title: "Recanto dos Pássaros | Portal de Informações",
    description: "Informações essenciais para moradores e administração do Residencial Recanto dos Pássaros.",
    type: "website",
    locale: "pt_BR",
    url: "https://recantopassaros.vercel.app/",
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
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
