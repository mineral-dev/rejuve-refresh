import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { store } from "@/store/store";
import "@/styles/globals.scss";
import "@/styles/fonts.scss";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  );
}
