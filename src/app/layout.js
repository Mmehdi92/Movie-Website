import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Providers from "./Providers";
import AuthProvider from "./context/AuthContext";

import Footer from "./components/Footer";
import AddBanner from "./components/AddBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Website",
  description: "This is a movie website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <AuthProvider>

        <Providers>
          {/* Header*/}
          {/* <AddBanner /> */}
          <Header />
    
          {/* Filter*/}
          {/* <MovieFilter /> */}
          {/* SearchBox*/}
          {/* <SearchBox /> */}

          {/* {Footer} */}
          {children}
          <Footer />
        </Providers>
      </AuthProvider>
      </body>
    </html>
  );
}
