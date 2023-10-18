import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Providers from "./Providers";
import MovieFilter from "./components/MovieFilter";
import SearchBox from "./components/SearchBox";
import Footer from "./components/Footer";

import Results from "./components/Results";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Website",
  description: "This is a movie website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
       <Providers>
        {/* Header*/}
        <Header />
        {/* Filter*/}
        <MovieFilter />
        {/* SearchBox*/}
        <SearchBox />
       
     
        {/* {Footer} */}
        {children}
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
