'use client'
import {useEffect, useState} from "react";
import {useProfile, useSidebarOpen} from "@/store";
import sidebarActions from "@/actions/sidebar";
import {Navbar} from "@/components/common/Navbar";
import {Footer} from "@/components/common/Footer";
import {HomeContent} from "@/components/homeComponents/HomeContent";
import {LoaderPage} from "@/components/common/LoaderPage";
import {TotalCard} from "@/components/common/TotalCard";
import profileActions from "@/actions/profile";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    const {connected} = useWallet();
    const isOpen = useSidebarOpen();
    const profile = useProfile();

    useEffect(() => {
        sessionStorage.setItem('page', 'main')
        if(connected) {
            profileActions.getCurrentProfile().catch(r=>console.log(r, "home"))
        }
        setIsLoading(false);
    }, [])

    return (
        <>
            {
                isLoading ?
                    <LoaderPage/>
                    :
                    (
                        <div
                            data-bg={isOpen}
                            onClick={() => {
                                sidebarActions.setSidebarOpen(false);
                            }}
                            className={'dashboard-content'}
                        >
                            <div className={'min-h-full md:min-h-[100vh] md:h-full flex-1 overflow-hidden'}>
                                <Navbar/>
                                <div className={"mx-auto mt-[50px] md:mt-[100px] w-[90%] md:w-1/2 min-w-1/2 md:pb-[130px]"}>
                                    {connected &&
                                        <TotalCard profile={profile}/>
                                    }
                                    <div
                                        className={'relative flex font-bold font-normal text-base md:text-2xl leading-[28px] place-items-center ' +
                                            'justify-center top-5 h-[80px] text-center text-white w-1/2 mx-auto rounded-2xl min-w-[200px] ' +
                                            'bg-[#000000] border-black border-[2px] border-solid py-3 px-5 gap-12 z-10'}>
                                        НАЧАЛЬНАЯ СТРАНИЦА
                                    </div>
                                    <HomeContent profile={profile}/>
                                </div>
                                {/* <img
                                    src={"../assets/loader-bg.jpg"}
                                    alt={'background'}
                                    className={"absolute top-0 z-[-1] w-full object-cover h-full"}/> */}
                                <video 
                                    autoPlay muted loop
                                    className={"absolute top-0 z-[-1] w-full object-cover h-full"}
                                    style={{objectFit: "cover"}}
                                    >

                                    <source src={"../video/composition.webm"} type="video/webm" />
                                        background
                                </video>
                                {/* <video
                                   src={require('../../../public/video/murz.mp4')}
                               autoPlay
                             controls={false}
                               muted
                             loop
                             className={"absolute top-0 z-[-1] w-full object-cover h-[calc(100%_-_16vh)]"}/> */}
                            </div>
                            <Footer/>
                        </div>
                    )
            }
        </>
    )
}
