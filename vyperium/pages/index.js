import HeadComp from "@/layout/HeadComp";
import Index from "./components/Index";
import { VenomConnect } from 'venom-connect';
import ConnectWallet from "./venom-connect/configure";

export default function Home() {
  return (
    <>
    <HeadComp title="Vyperium - Home" />
    <ConnectWallet/>
    <Index />
    </>
  )
}
