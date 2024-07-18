import { Roboto } from "next/font/google";
import "../styles/globals.css";

const roboto = Roboto({ subsets: ["latin"], weight:["400","500","700","900"] });

export const metadata = {
  title: "Blog",
  description: "Création d'un blog en NextJS",
};

export default function RootLayout({children}) {
  return (
    <html lang="fr">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
