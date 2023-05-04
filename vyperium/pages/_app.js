import React, { useState, useEffect} from 'react'
import Layout from '@/layout/Layout'
import '@/styles/globals.css'



export default function App({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}
