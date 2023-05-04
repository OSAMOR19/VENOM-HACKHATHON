import React, { useState, useEffect} from 'react';
import Layout from '@/layout/Layout';
import '@/styles/globals.css';
import { initVenomConnect } from './venom-connect/configure';



export default function App({ Component, pageProps }) {
  const [venomConnect, setVenomConnect] = useState();
const init = async () => {
  const _venomConnect = await initVenomConnect();
  setVenomConnect(_venomConnect);
};
useEffect(() => {
  init();
}, []);
  return <Layout venomConnect={venomConnect}><Component {...pageProps} /></Layout>
}
