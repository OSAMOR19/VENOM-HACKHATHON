import Image from "next/image"

const Index = () => {
  return (
    <>
        <section className="w-[90%] mx-auto pt-[8rem] text-white">
            <div className=" flex w-full items-center justify-evenly">
                <div className="w-[50%]">
                    <p className=" text-[#808080] font-raleway">Smart, Social Web3 Wallet</p>
                    <p className=" font-openSans mb-[2rem] text-[2rem]">Manage your DeFi and NFT portfolios, trade across 10+ networks and connect to any decentralized application with one wallet</p>
                    <button className="font-raleway bg-[#0052FF] px-4 py-2 rounded-[5px]">Connect Wallet</button>
                </div>
                <div className=" ">
                    <Image src = "/images/landing-pageImg.svg" alt="landing-pageImg" height={1} width={300} />
                </div>
            </div>
        </section>
        <section className="mt-[7rem] text-white">
            <h3 className="text-[2rem] pb-[5px] font-openSans font-[700] text-center">Unlock the world of crypto</h3>
            <p className=" text-center text-[#808080] font-raleway">Life on the blockchain made simple and secure.</p>
            <div className="gap-[3rem]  mt-[4rem] flex w-[80%] mx-auto">
                <div className="p-4 flex-1 space-y-[1rem] border-[1px] border-[#808080]">
                    <Image src="/images/vyperium-logo.svg" width={40} height={1} />
                    <h3 className=" w-[40%] text-[1rem] font-poppins font-[700]">Control your crypto</h3>
                    <p className="font-openSans">Venom Wallet is a self-custody wallet, giving you complete control of your crypto.</p>
                </div>
                <div className="p-4 flex-1 space-y-[1rem] border-[1px] border-[#808080]">
                    <Image src="/images/vyperium-logo.svg" width={40} height={1} />
                    <h3 className=" w-[40%] text-[1rem] font-poppins font-[700]">Store all of your NFTs</h3>
                    <p className="font-openSans">Safely store and easily view all of your Ethereum and Polygon NFTs right in your Wallet.</p>
                </div>
                <div className="p-4 flex-1 space-y-[1rem] border-[1px] border-[#808080]">
                    <Image src="/images/vyperium-logo.svg" width={40} height={1} />
                    <h3 className=" w-[50%] text-[1rem] font-poppins font-[700]">Industry-leading security</h3>
                    <p className="font-openSans">Additional security options on all of your devices provide more ways to keep your crypto safe and secure.</p>
                </div>
            </div>
        </section>
        <section className="w-[90%] mx-auto pt-[13rem] text-white">
            <div className=" flex w-full items-center justify-evenly">
                <div className=" ">
                    <Image src = "/images/landing-pageImg.svg" alt="landing-pageImg" height={1} width={300} />
                </div>
                <div className="w-[46%]">
                    <h3 className=" font-poppins font-[700] pb-[2rem] text-[2rem]">Explore the decentralized web with confidence</h3>
                    <p className=" font-openSans mb-[2rem] text-[1.2rem]">VENOM Wallet is your passport to the decentralized web. Harness the power of DeFi to earn yield, grow your NFT collection, and much more.</p>
                    <button className="font-raleway bg-[#0052FF] px-4 py-2 rounded-[5px]">Connect Wallet</button>
                </div>
            </div>
        </section>
        <section className="w-[90%] mx-auto pt-[8rem] text-white">
            <div className=" flex w-full items-center justify-evenly">
                <div className="w-[46%]">
                    <h3 className="text-center font-poppins font-[700] pb-[2rem] text-[2rem]">Secure. Simple. All-in-one.</h3>
                    <ul className=" list-disc">
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">A true multi-chain wallet, from Bitcoin, Ethereum, Tezos and 70+ cryptoassets</li>
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">Buy, sell, and trade in a few simple taps</li>
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">Store, view, and discover NFTs, DeFi, and thousands of Dapps!</li>
                    </ul>
                </div>
                <div className=" ">
                    <Image src = "/images/phone-lp.svg" alt="landing-pageImg" height={1} width={250} />
                </div>
            </div>
        </section>
        <section className="pt-[13rem]">
            <div className=" w-[70%] mx-auto flex flex-col gap-10 items-center">
                <Image src="/images/img-landing.svg" height={1} width={650} alt="img-landing" />
                <div className="w-[70%] flex gap-4">
                    <div className=" p-3 bg-[#1A1A26]"><Image src = "/images/ptnr1.svg" alt="landing-pageImg" height={1} width={100} /></div>
                    <div className=" p-3 bg-[#1A1A26]"><Image src = "/images/ptnr2.svg" alt="landing-pageImg" height={1} width={100} /></div>
                    <div className=" p-3 bg-[#1A1A26]"><Image src = "/images/ptnr3.svg" alt="landing-pageImg" height={1} width={100} /></div>
                    <div className=" p-3 bg-[#1A1A26]"><Image src = "/images/ptnr4.svg" alt="landing-pageImg" height={1} width={100} /></div>
                    <div className=" p-3 bg-[#1A1A26]"><Image src = "/images/ptnr1.svg" alt="landing-pageImg" height={1} width={100} /></div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Index
