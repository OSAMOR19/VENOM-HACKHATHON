import HeadComp from "@/layout/HeadComp"
import { useData } from "@/context/DataContext";

const Explore = () => {
  const {setIsOnApp} = useData()
  setIsOnApp(true)
  return (
    <>
        <HeadComp title="Vyperium - Explore" />
      <div  className="md:ml-[22%] mx-[2%] md:w-[71%] pt-[1rem] md:mr-[7%] mt-[4rem] md:mt-[5rem] text-white">
        <section className=" flex flex-col items-center justify-center  text-white py-8">
          <div className="text-3xl font-bold py-3">Explore <span className="text-[#008000]">Venom</span> Ecosystem</div>
          <p className="text-lg font-normal">Vyperium keeps you updated on the recent happenings on Venom Blockchain.</p>
        </section>

           <section className="projects ">
            <div>Top Projects on Venom</div>
            <div>
              
            </div>
           </section>


           <section className="top-pools"></section>
        </div>
    </>
  )
}



export default Explore;
