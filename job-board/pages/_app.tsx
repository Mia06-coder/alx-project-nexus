import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { JobsProvider } from "@/context/JobsContext";
import { ApplicationProvider } from "@/context/ApplicationContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JobsProvider>
      <ApplicationProvider>
        <FavoritesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FavoritesProvider>
      </ApplicationProvider>
    </JobsProvider>
  );
}
