import React, { useState, useEffect} from 'react';
import Layout from '@/layout/Layout';
import '@/styles/globals.css';
import { initVenomConnect } from './venom-connect/configure';

const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null



export default function App({ Component, pageProps }) {
  const [venomConnect, setVenomConnect] = useState();
const init = async () => {
  const _venomConnect = await initVenomConnect();
  setVenomConnect(_venomConnect);
};
useEffect(() => {
  new WOW().init()
  init();
}, []);
  return <Layout venomConnect={venomConnect}><Component {...pageProps} /></Layout>
}
