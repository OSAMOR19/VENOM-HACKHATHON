import Image from "next/image"
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Accordion from "../../pure components/Accordion";
import { useData } from "@/context/DataContext";


const HomePage = () => {
    const {setIsOnApp} = useData()
    setIsOnApp(false)
    const items = [
        { title: 'How do i track my wallet on Vyperium ', content: 'Launch Vyperium App, When you launch the next thing you should do is to   connect your wallet then your activies would be returned on the dashboard.' },
        { title: 'How do i manage my assets on Vyperium', content: 'When you launch our Dapp and you connect your wallet. on the left top corner  of the dashboard you will find a my wallet menu . On my Wallet page there is a dedicated section  to assets where all your asset are managed. The My Wallet page provides users with an overview of their wallet addresses and associated tokens. Users can manage multiple wallets within the VYPERIUM app and easily switch between them. This page displays the wallet addresses, token balances, transaction history, and other wallet-specific information. It offers convenient management of multiple wallets in one place.' },
        { title: 'How do i transfer tokens on Vyperium', content: 'Vyperium tracks your asset therefore has all details of all your assets. All you have to do is select the token you want to transfer and send. ' },
        { title: 'Does Vyperium have a pool', content: 'Vyperium does not have a pool of his own but gives you access to all the active and beneficial pools on the explore page of the Venom Blockchain.'},
        { title: 'What Blockchain can i bridge to using Vyperium', content: 'Vyperium uses Venom Bridge Api there for all chains you might want to bridge  using the Venom Bridge would be possible with Vyperium bridge. ' },
      ];
 
      
  return (
    <>
        <section className="mt-2 bg-wp mx-auto pt-[8rem] text-white">
            <div className="flex gap-10 md:gap-0 flex-col md:flex-row w-full items-center justify-evenly">
                <div className="wow fadeInUp w-[90%] md:w-[50%]">
                    <p className=" text-[#808080] font-raleway">An Intuitive Token Wallet Tracker </p>
                    <p className="font-openSans mb-[2rem] text-[2rem]">Manage your Venom <span className="font-bold text-[#008000]">DeFi</span> and <span className="font-bold text-[#008000]">NFT</span> portfolios,trade seamlessly across Venom Blockchain and bridge your assets across other blockchains with <span className="font-bold text-[#008000]">Vyperium.</span></p>
                    <div className="flex  text-[1.2rem] font-medium ">
                    <Link href="/app/Wallet">
                        <div className="p-2 bg-[#008000] rounded mr-2 cursor-pointer hover:bg-white hover:text-[#008000]">
                            Launch DApp
                        </div>
                    </Link>
                    <a href="https://drive.google.com/file/d/1ZlE8WZkXI6dWDOk9DZYnLH-F4HOUy_nE/view" target="blank">
                        <div className="p-2 border hover:border-[#008000] rounded mr-2 cursor-pointer">
                            Read Docs
                        </div>
                    </a>
                    </div>
                </div>
                <div className=" wow slideInLeft ">
                    <Image src = "/images/vyperiumhome1.png" alt="landing-pageImg" height={1} width={300} />
                </div>
            </div>
        </section>
        <section className="mt-[7rem] pb-[3rem] text-white">
            <h3 className="text-[2rem] pb-[5px] wow bounceInDown font-openSans font-[800] text-center">Scaling Venom Ecosystem</h3>
            <p className=" text-center text-[#808080] font-raleway">Life on the <span className="text-[#008000]"> Venom Blockchain</span> made simple and secure.</p>
            <div className="px-5"><p className="wow slideInDown font-openSans mb-[2rem] text-[1.2rem]">VYPERIUM is a decentralized application built on the Venom blockchain, offering a suite of essential features for secure and seamless token management. Our platform includes features such as token swapping, bridging, and sending tokens .</p></div>
            <div className="gap-[3rem]  mt-[4rem] flex flex-col md:flex-row w-[80%] mx-auto">
            <div className="p-4 flex-1 wow slideInUp flex flex-col items-center space-y-[1rem] border-[1px] rounded border-[#008000] ">
                <Image src="/images/vyperium-logo.svg" width={40} height={40} alt="track" />
                <h3 className="w-[80%] text-[1rem] font-poppins font-[700] text-center">Manage and Track Assets</h3>
                <p className="font-openSans text-center">Vyperium allows you manage your assets and tracks the performance of your wallet and any other wallet the on Venom Blockchain.</p>
            </div>

            <div className="p-4 flex-1  flex flex-col items-center space-y-[1rem] border-[1px] rounded border-[#008000]">
                <Image src="/images/vyperium-logo.svg" alt="Trade" width={40} height={40} />
                <h3 className="w-[80%] text-[1rem] font-poppins font-[700] text-center">Trade seamlessly on Venom Blockchain with Vyperium</h3>
                <p className="font-openSans text-center">Vyperium allows you trade on Venom Blockchain. With the speed of light, you can send,swap and bridge your assets .</p>
            </div>

            <div className="p-4 flex-1 wow slideInUp flex flex-col items-center space-y-[1rem] border-[1px] rounded border-[#008000]">
                <Image src="/images/vyperium-logo.svg" width={40} height={40} alt="secure" />
                <h3 className="w-[80%] text-[1rem] font-poppins font-[700] text-center">Stay safe on Venom Blockchain with Vyperium</h3>
                <p className="font-openSans text-center">Vyperium keep you secure on venom blockchain by ensuring that you are interacting with the right source and right projects.</p>
            </div>
            </div>
        </section>
        <section className="mt-5 bg-wp mx-auto pt-[8rem] pb-[3rem] text-white">
            <div className=" flex gap-10 md:gap-0 flex-col md:flex-row w-full items-center  justify-evenly">
                <div className=" wow slideInLeft">
                    <Image src = "/images/vyperhome.png" alt="landing-pageImg" height={200} width={500} />
                </div>
                <div className="md:w-[46%] w-[90%] ">
                    <h3 className="wow flipInX font-poppins font-[700] pb-[2rem] text-[2rem]">Frequently Asked Questions about <span className="text-[#008000]">Vyperium</span></h3>
                    
                    <Accordion items={items} />

                </div>
            </div>
        </section>
        <section className="bg-[#020202] md:pt-[1rem] pt-[4rem] pb-[3rem] text-white">
            <div className=" flex flex-col md:flex-row w-full items-center justify-evenly">
                <div className="md:w-[46%] w-[90%]">
                    <h3 className="md:text-center font-poppins w-[70%] md:w-full wow bounceInLeft font-[700] pb-[2rem] text-[2rem]">Secure. Simple. All-in-one.</h3>
                    <ul className="wow slideInLeft md:list-disc">
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">Our platform includes features such as token swapping, bridging, and sending tokens/coins.</li>
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">Buy, sell, and trade in a few simple taps</li>
                        <li className=" font-openSans mb-[2rem] text-[1.2rem]">Store, view, and discover NFTs, DeFi, and thousands of Dapps!</li>
                    </ul>
                </div>
                <div className="wow slideInDown">
                    <Image src = "/images/vyperhome1.png" alt="landing-pageImg" height={200} width={400} />
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

export default HomePage
