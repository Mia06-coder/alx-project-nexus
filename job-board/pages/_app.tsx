import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { JobsProvider } from "@/context/JobsContext";
import { ApplicationProvider } from "@/context/ApplicationContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutRoutes = ["/", "/login", "/register"];
  const hideLayout = noLayoutRoutes.includes(router.pathname);

  return (
    <>
      {hideLayout ? (
        <>
          <SEO />
          <Component {...pageProps} />
        </>
      ) : (
        <JobsProvider>
          <ApplicationProvider>
            <FavoritesProvider>
              <Layout>
                <SEO />
                <Component {...pageProps} />
              </Layout>
            </FavoritesProvider>
          </ApplicationProvider>
        </JobsProvider>
      )}
    </>
  );
}
