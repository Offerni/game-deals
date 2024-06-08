import PageHeader from "components/PageHeader";
import "./globals.css";

import { Metadata } from "next";
import PageFooter from "components/PageFooter";
import { toggleBodyDarkMode } from "utils";
import { ModalContextProvider } from "components/ModalContext";
import ScrollToTop from "components/ScrollToTop";

export const metadata: Metadata = {
  title: "Deal Finder",
  description: "Find the best game deals",
  icons: "../../public/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-JYG43ZJ4V1"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-JYG43ZJ4V1");
    </script> */}

      <body>
        <div id="root">
          <ScrollToTop />
          <ModalContextProvider>
            <div className="min-h-screen dark:bg-gray-800 bg-white">
              <PageHeader />
              {children}
              <PageFooter />
            </div>
          </ModalContextProvider>
        </div>
      </body>
    </html>
  );
}
