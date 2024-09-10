import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import heroBG from "@/assets/hero-bg.jpg";
import Navbar from "./Utils/Navbar";
import Cursor from "./Utils/Cursor/Cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
      title: "Galaxy Spark BD",
      description: "A design and development agency",
};

export default function RootLayout({ children }) {
      return (
            <html lang="en">
                  <link
                        rel="shortcut icon"
                        href="logo.ico"
                        type="image/x-icon"
                  />
                  <body
                        id="home"
                        className={`${inter.className} bg-background-dark text-primary`}
                  >
                        <div className=" sm:w-full max-w-[1440px] mx-auto overflow-hidden">
                              <div className="max-w-[1440px] h-[32.2rem] lg:h-[23rem] mx-auto absolute top-0 left-0 right-0 -z-10">
                                    <Image
                                          src={heroBG}
                                          alt="Hero_bg"
                                          width={1920}
                                          height={1080}
                                          className="w-full h-full object-cover "
                                    />
                              </div>
                              <div className="max-w-[1240px] overflow-hidden mx-auto">
                                    <Navbar />
                                    {children}
                              </div>
                        </div>
                        <Cursor />
                  </body>
            </html>
      );
}
