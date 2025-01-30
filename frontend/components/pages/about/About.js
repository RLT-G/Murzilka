'use client'

import {useEffect, useState} from "react";
import {Navbar} from "@/components/common/Navbar";
import sidebarActions from "@/actions/sidebar";
import {AboutContent} from "@/components/homeComponents/AboutContent";
import {Footer} from "@/components/common/Footer";
import {useSidebarOpen} from "@/store";
import {LoaderPage} from "@/components/common/LoaderPage";

export const About = () => {

    const isOpen = useSidebarOpen();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        sessionStorage.setItem('page', 'about')
        setIsLoading(false)
    }, [])

    return (
        <>{
            isLoading ?
                <LoaderPage/>
                :
                <div
                    data-bg={isOpen}
                    onClick={() => {
                        sidebarActions.setSidebarOpen(false);
                    }}
                    className={'dashboard-content'}
                >
                    <div className={'min-h-[89vh] flex-1 overflow-hidden'}>
                        <Navbar/>
                        <div className={"mx-auto mt-[50px] md:mt-[100px] w-[90%] md:w-1/2 min-w-1/2 pb-[70px] md:pb-[130px]"}>
                            <div
                                className={'relative flex font-bold font-normal text-lg md:text-2xl leading-[28px] place-items-center ' +
                                    'justify-center top-5 h-[80px] text-center text-white w-1/2 mx-auto rounded-2xl min-w-[200px] ' +
                                    'bg-[#000000] border-black border-[2px] border-solid py-3 px-5 gap-12 z-10'}>
                                О НАС
                            </div>
                            <AboutContent/>
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

                    </div>
                    <Footer/>
                </div>
        }
        </>
    )
}
