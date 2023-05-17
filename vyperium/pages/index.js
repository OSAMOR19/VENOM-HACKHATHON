import HeadComp from "@/layout/HeadComp";
import Index from "./components/Index";
import Test from '@/layout/Test'
import Overview from "./app/Overview";

export default function Home() {
  return (
    <>
      <HeadComp title="Vyperium - Home" />
      {/* <Index /> */}
      <Overview />
    </>
  )
}
