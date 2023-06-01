import HeadComp from "@/layout/HeadComp";
import Index from "./components/Index";
import Wallet from "./app/Wallet";
import Overview from "./app/Overview";
import Dashboard from "./app/test";

export default function Home() {
  return (
    <>
      <HeadComp title="Vyperium - Home" />
      {/* <Index /> */}
      <Overview />
    </>
  )
}
