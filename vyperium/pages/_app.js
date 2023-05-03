import Layout from '@/layout/Layout';
import '@/styles/globals.css';
import React, { useState, useEffect } from 'react';
import { initVenomConnect } from './venom-connect/configure';
import { VenomConnect } from 'venom-connect';


export default function App({ Component, pageProps }) {

  const [venomConnect, setVenomConnect] = useState();
  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };
  useEffect(() => {
    init();
  }, []);

  return <Layout><Component {...pageProps} /></Layout>
}
