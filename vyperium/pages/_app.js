import React, { useState, useEffect} from 'react';
import Layout from '@/layout/Layout';
import '@/styles/globals.css';
import { DataGet } from './context/DataContext';

const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null



export default function App({ Component, pageProps }) {
 
useEffect(() => {
  new WOW().init();
}, []);
  return <DataGet><Layout ><Component {...pageProps} /></Layout></DataGet>
}
