import HeadComp from "@/layout/HeadComp"
import projects from "@/constant/data/top-projects";
import {FaTwitter, FaDiscord, FaGlobe } from 'react-icons/fa'
import { useData } from "@/context/DataContext";

const Explore = () => {
  const {setIsOnApp} = useData()
  setIsOnApp(true)
  return (
    <>
        <HeadComp title="Vyperium - Explore" />
      <div  className="md:ml-[22%] mx-[2%] md:w-[71%] pt-[1rem] md:mr-[7%] mt-[4rem] md:mt-[5rem] text-white ">
        <section className=" flex flex-col items-center justify-center  text-white py-8 bg-neutral-900 rounded">
          <div className="text-3xl font-bold py-3">Explore <span className="text-[#008000]">Venom</span> Ecosystem</div>
          <p className="text-lg font-normal text-neutral-500">Vyperium keeps you updated on the recent happenings on Venom Blockchain.</p>
        </section>

           <section className="projects ">
            <div className="text-neutral-500 text-3xl font-bold  my-[3rem]">Top Projects on Venom</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="bg-neutral-900 p-4 rounded-lg border border-neutral-700 hover:border-[#008000] cursor-pointer">
                    <h2 className="text-2xl text-center font-bold mb-2">{project.title}</h2>
                    <p className="mb-4 font-normal ">{project.about}</p>
                    <div className="flex space-x-4">
                      <a href={project.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-gray-200 hover:text-[#008000]" />
                      </a>
                      <a href={project.discord} target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="text-gray-200  hover:text-[#008000]" />
                      </a>
                      <a href={project.website} target="_blank" rel="noopener noreferrer">
                        <FaGlobe className="text-gray-200  hover:text-[#008000]" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
           </section>


           <section className="top-pools">
           <div className="text-[#008000] text-3xl font-bold  my-[3rem]">Trending on Venom</div>
           <div className="text-white font-bold text-3xl">Coming Soon</div>
           </section>
        </div>
    </>
  )
}



export default Explore;
