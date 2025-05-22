import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/providers/page";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "100", "200", "300", "500", "600", "700", "800"], // ajusta los pesos que necesites
});

export const metadata: Metadata = {
  title: "ChapaTuRuta – Detalle de Paradero",
  description:
    "Consulta horarios, ubicación y rutas disponibles para tu paradero en ChapaTuRuta.",
  openGraph: {
    title: "ChapaTuRuta – Detalle de Paradero",
    description:
      "Consulta horarios, ubicación y rutas disponibles para tu paradero en ChapaTuRuta.",
    siteName: "ChapaTuRuta",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-gray-50`}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
