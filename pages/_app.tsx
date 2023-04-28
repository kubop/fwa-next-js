import '@/styles/globals.css'
import 'flowbite'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import 'nprogress/nprogress.css'
import NProgress from "nprogress";

import Layout from '../components/Layout'
import { UserEditsProvider } from '@/contexts/UserEditsContext'

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
 
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);
 
    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
