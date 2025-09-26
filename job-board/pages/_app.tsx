import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { JobsProvider } from "@/context/JobsContext";
import { ApplicationProvider } from "@/context/ApplicationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JobsProvider>
      <ApplicationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApplicationProvider>
    </JobsProvider>
  );
}
