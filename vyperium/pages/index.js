import HeadComp from "@/layout/HeadComp";
import Index from "./components/Index";
import ConnectWallet from "./venom-connect/ConnectWallet";


export default function Home() {
  return (
    <>
    <HeadComp title="Vyperium - Home" />
    <ConnectWallet/>
    <Index />
    </>
  )
}
