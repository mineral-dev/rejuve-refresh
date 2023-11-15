import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
