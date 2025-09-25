import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { JobsProvider } from "@/context/JobsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JobsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </JobsProvider>
  );
}
