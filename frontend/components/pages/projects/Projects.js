'use client'

import {useEffect, useState} from "react";
import {ProjectContent} from "@/components/projectsComponents/projectContent";
import sidebarActions from "@/actions/sidebar";
import {useProfile, useSidebarOpen, useTasks} from "@/store";
import {Navbar} from "@/components/common/Navbar";
import {Footer} from "@/components/common/Footer";
import tasksActions from "@/actions/tasks";
import profileActions from "@/actions/profile";
import {LoaderPage} from "@/components/common/LoaderPage";
import {TotalCard} from "@/components/common/TotalCard";
import {TasksContent} from "@/components/tasksComponent/TasksContent";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";

export const Projects = () => {
    const isOpen = useSidebarOpen();
    const [isLoading, setIsLoading] = useState(true);

    const {address, connected, wallet} = useWallet();
    const profile = useProfile();

    useEffect(() => {
        sessionStorage.setItem('page', 'projects')
        if(connected) {
            profileActions.getCurrentProfile().catch(r=>console.log(r, "project"))
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
                            <div className={'min-h-[89vh] flex-1 overflow-hidden'}>
                                <Navbar/>
                                <div className={"mx-auto mt-[100px] w-1/2 min-w-1/2 pb-[130px]"}>
                                    <ProjectContent/>
                                </div>
                                {/*<video*/}
                                {/*    src={"/video/murz_h264.mp4"}*/}
                                {/*    autoPlay*/}
                                {/*    muted*/}
                                {/*    loop*/}
                                {/*    className={"absolute top-0 z-[-1] w-full object-cover h-[calc(100%_-_16vh)]"}/>*/}
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
                    )
            }
        </>
    )
}

