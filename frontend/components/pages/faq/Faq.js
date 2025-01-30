'use client'

import {useEffect, useState} from "react";
import sidebarActions from "@/actions/sidebar";
import {Navbar} from "@/components/common/Navbar";
import {Footer} from "@/components/common/Footer";
import {useSidebarOpen} from "@/store";
import {FaqContent} from "@/components/faqComponents/faqContent";
import {LoaderPage} from "@/components/common/LoaderPage";

export const Faq = () => {

    const isOpen = useSidebarOpen();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        sessionStorage.setItem('page', 'faq')
        setIsLoading(false)
    }, [])

    return (
        <>{isLoading ?
            <LoaderPage/>
            :
            <div
                data-bg={isOpen}
                onClick={() => {
                    sidebarActions.setSidebarOpen(false);
                }}
                className={'dashboard-content'}
            >
                <div className={'min-h-full md:min-h-[89vh] md:h-[89vh] flex-1 overflow-hidden'}>
                    <Navbar/>
                    <div className={"mx-auto mt-[50px] md:mt-[100px] w-[90%] md:w-1/2 min-w-1/2 pb-[70px] md:pb-[130px]"}>
                        <FaqContent/>
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
