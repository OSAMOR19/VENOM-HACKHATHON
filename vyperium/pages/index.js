import React, {useState} from "react";
import HeadComp from "@/layout/HeadComp";
import HomePage from "./components";
import Test from '@/layout/Test'
import Overview from "./app/Overview";
import Overview1 from "./app/[userwallet]/Overview1";


export default function Home() {
  return (
    <>
      <HeadComp title="Vyperium - Home" />
      {/* <Index /> */}
      {/* <Overview /> */}
      <Overview1/>
    </>
  )
}
