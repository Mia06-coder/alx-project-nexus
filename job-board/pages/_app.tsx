import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { JobsProvider } from "@/context/JobsContext";
import { ApplicationProvider } from "@/context/ApplicationContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutRoutes = ["/", "/login", "/register"];
  const hideLayout = noLayoutRoutes.includes(router.pathname);

  return (
    <>
      {hideLayout ? (
        <Component {...pageProps} />
      ) : (
        <JobsProvider>
          <ApplicationProvider>
            <FavoritesProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </FavoritesProvider>
          </ApplicationProvider>
        </JobsProvider>
      )}
    </>
  );
}
