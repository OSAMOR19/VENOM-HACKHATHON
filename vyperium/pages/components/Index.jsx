import Image from "next/image"
import Connectwallet from "../venom-connect/connectwallet"
import { useEffect } from "react"
const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null

const Index = () => {
    useEffect (() => {
        new WOW().init()
    }, [])
  return (
    <>
        <section className="mt-2 bg-wp mx-auto pt-[8rem] text-white">
            <div className="flex gap-10 md:gap-0 flex-col md:flex-row w-full items-center justify-evenly">
                <div className="wow fadeInUp w-[90%] md:w-[50%]">
                    <p className=" text-[#808080] font-raleway">Smart, Social Web3 Wallet</p>
                    <p className="font-openSans mb-[2rem] text-[2rem]">Manage your DeFi and NFT portfolios, trade across 10+ networks and connect to any decentralized application with one wallet</p>
                    <Connectwallet />
                </div>
                <div className=" wow slideInLeft ">
                    <Image src = "/images/landing-pageImg.png" alt="landing-pageImg" height={1} width={300} />
                </div>
            </div>
        </section>
        <section className="mt-[7rem] pb-[3rem] text-white">
            <h3 className="text-[2rem] pb-[5px] wow bounceInDown font-openSans font-[700] text-center">Unlock the world of crypto</h3>
            <p className=" text-center text-[#808080] font-raleway">Life on the blockchain made simple and secure.</p>
            <div className="gap-[3rem]  mt-[4rem] flex flex-col md:flex-row w-[80%] mx-auto">
                <div className="p-4 flex-1 wow slideInUp space-y-[1rem] border-[1px] border-[#808080]">
                    <Image src="/images/vyperium-logo.svg" width={40} height={1} />
                    <h3 className=" w-[40%] text-[1rem] font-poppins font-[700]">Control your crypto</h3>
                    <p className="font-openSans">Venom Wallet is a self-custody wallet, giving you complete control of your crypto.</p>
                </div>
                <div className="p-4 flex-1 space-y-[1rem] border-[1px] border-[#808080]">
                    <Image src="/images/vyperium-logo.svg" width={40} height={1} />
                    <h3 className=" w-[40%] text-[1rem] font-poppins font-[700]">Store all of your NFTs</h3>
                    <p className="font-openSans">Safely store and easily view all of your Ethereum and Polygon NFTs right in your Wallet.</p>
                </div>
                <div className="p-4 flex-1 wow slideInDown space-y-[1rem] border-[1px] border-[#808080]">
                    <Image src="/images/vyperium-logo.svg" width={40} height={1} />
                    <h3 className=" w-[50%] text-[1rem] font-poppins font-[700]">Industry-leading security</h3>
                    <p className="font-openSans">Additional security options on all of your devices provide more ways to keep your crypto safe and secure.</p>
                </div>
            </div>
        </section>
        <section className="mt-5 bg-wp mx-auto pt-[8rem] pb-[3rem] text-white">
            <div className=" flex gap-10 md:gap-0 flex-col md:flex-row w-full items-center justify-evenly">
                <div className=" wow slideInLeft">
                    <Image src = "/images/landing-pageImg2.png" alt="landing-pageImg" height={1} width={300} />
                </div>
                <div className="md:w-[46%] w-[90%] ">
                    <h3 className="wow flipInX font-poppins font-[700] pb-[2rem] text-[2rem]">Explore the decentralized web with confidence</h3>
                    <p className="wow slideInDown font-openSans mb-[2rem] text-[1.2rem]">VENOM Wallet is your passport to the decentralized web. Harness the power of DeFi to earn yield, grow your NFT collection, and much more.</p>
                    <Connectwallet />
                </div>
            </div>
        </section>
        <section className="bg-[#020202] md:pt-[1rem] pt-[4rem] pb-[3rem] text-white">
            <div className=" flex flex-col md:flex-row w-full items-center justify-evenly">
                <div className="md:w-[46%] w-[90%]">
                    <h3 className="md:text-center font-poppins w-[70%] md:w-full wow bounceInLeft font-[700] pb-[2rem] text-[2rem]">Secure. Simple. All-in-one.</h3>
                    <ul className="wow slideInLeft md:list-disc">
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">A true multi-chain wallet, from Bitcoin, Ethereum, Tezos and 70+ cryptoassets</li>
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">Buy, sell, and trade in a few simple taps</li>
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">Store, view, and discover NFTs, DeFi, and thousands of Dapps!</li>
                    </ul>
                </div>
                <div className="wow slideInDown">
                    <Image src = "/images/phone-lp.svg" alt="landing-pageImg" height={1} width={250} />
                </div>
            </div>
        </section>
        <section className="pt-[8rem] pb-[5rem]">
            <div className=" md:w-[70%] w-[94%] mx-auto flex flex-col gap-10 items-center">
                <Image src="/images/img-landing.svg" className=" wow flipInY" height={1} width={650} alt="img-landing" />
                <div className="md:w-[70%] overflow-x-auto justify-evenly flex gap-4">
                    <div className="wow bounceInDown p-3 bg-[#1A1A26]"><Image src = "/images/ptnr1.svg" alt="landing-pageImg" height={1} width={100} /></div>
                    <div data-wow-delay=".2s" className="wow bounceInDown p-3 bg-[#1A1A26]"><Image src = "/images/ptnr2.svg" alt="landing-pageImg" height={1} width={100} /></div>
                    <div className=" p-3 bg-[#1A1A26]"><Image src = "/images/ptnr3.svg" alt="landing-pageImg" height={1} width={100} /></div>
                    <div data-wow-delay=".2s" className="wow bounceInUp p-3 bg-[#1A1A26]"><Image src = "/images/ptnr4.svg" alt="landing-pageImg" height={1} width={100} /></div>
                    <div className="wow bounceInUp p-3 bg-[#1A1A26]"><Image src = "/images/ptnr1.svg" alt="landing-pageImg" height={1} width={100} /></div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Index
