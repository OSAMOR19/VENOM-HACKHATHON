import React, { useState, useEffect} from 'react';
import Layout from '@/layout/Layout';
import '@/styles/globals.css';

const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null



export default function App({ Component, pageProps }) {
 
useEffect(() => {
  new WOW().init();
}, []);
  return <Layout ><Component {...pageProps} /></Layout>
}
