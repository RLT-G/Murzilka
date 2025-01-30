'use client'

import {useEffect, useState} from "react";
import {ItemContent} from "@/components/projectsComponents/ItemContent";
import sidebarActions from "@/actions/sidebar";
import {useProfile, useSidebarOpen} from "@/store";
import {Navbar} from "@/components/common/Navbar";
import {Footer} from "@/components/common/Footer";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {TotalCard} from "@/components/common/TotalCard";
import {ProjectItemContent} from "@/components/projectsComponents/ProjectItemContent";
import {LoaderPage} from "@/components/common/LoaderPage";
import profileActions from "@/actions/profile";
import {getSlug} from "@/utils/common";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";

export const ProjectDetail = () => {
    const isOpen = useSidebarOpen();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { address, connected, wallet } = useWallet();
    const projectName = getSlug();
    const profile = useProfile();

    useEffect(() => {
        sessionStorage.setItem('page', projectName);
        if(connected) {
            profileActions.getCurrentProfile().catch(r=>console.log(r, "ProjectDetail"))
        }
        setIsLoading(false)
    }, [])

    return (
        <>
            {
                isLoading ? <LoaderPage/>
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
                            <div className={"mx-auto mt-[100px] w-1/2 min-w-1/2 pb-[130px]"}>
                                {connected &&
                                    <TotalCard profile={profile}/>
                                }
                                <div
                                    className={'relative flex font-bold font-normal text-2xl leading-[28px] place-items-center ' +
                                        'justify-center top-5 h-[80px] text-center text-white w-1/2 mx-auto rounded-2xl min-w-[200px] ' +
                                        'bg-[#000000] border-black border-[2px] border-solid py-3 px-5 gap-12 z-10'}>
                                    ПРОЕКТ
                                </div>
                                <ItemContent ProjectItemComponent={ProjectItemContent}/>
                                <div className={"mx-auto w-[12%]"}>
                                    <Button
                                        onClick={() => router.push('/')}
                                        className={'w-full relative font-bold text-base leading-5 mt-10 text-white bg-[#E17777] btn'}>НАЗАД</Button>
                                </div>
                            </div>
                            <video
                                src={"/video/murz_h264.mp4"}
                                autoPlay
                                muted
                                loop
                                className={"absolute top-0 z-[-1] w-full object-cover h-full"}/>
                        </div>
                        <Footer/>
                    </div>
            }
        </>
    )
}
