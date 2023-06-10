import HeadComp from "@/layout/HeadComp"
import { useData } from "@/context/DataContext";

const Explore = () => {
  const {setIsOnApp} = useData()
  setIsOnApp(true)
  return (
    <>
        <HeadComp title="Vyperium - Explore" />
    </>
  )
}



export default Explore;
