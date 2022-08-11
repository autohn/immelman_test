import type { AppProps } from "next/app";
import Layout from "../src/components/Layout";
import GlobalStyle from "../src/globalStyles";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
