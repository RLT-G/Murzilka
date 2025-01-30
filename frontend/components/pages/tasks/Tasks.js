'use client'
import {useEffect, useState} from "react";
import {useCompletedTasksId, useProfile, useSidebarOpen, useTasks} from "@/store";
import sidebarActions from "@/actions/sidebar";
import {Navbar} from "@/components/common/Navbar";
import {Footer} from "@/components/common/Footer";
import {LoaderPage} from "@/components/common/LoaderPage";
import {TotalCard} from "@/components/common/TotalCard";
import {TasksContent} from "@/components/tasksComponent/TasksContent";
import tasksActions from "@/actions/tasks";
import profileActions from "@/actions/profile";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";

export const Tasks = () => {
    const isOpen = useSidebarOpen();
    const completedTasksId = useCompletedTasksId();
    const tasks = useTasks();
    const {connected} = useWallet()
    const profile = useProfile();

    const [isLoading, setIsLoading] = useState(true);
    const [completeTask, setCompleteTask] = useState(false);

    useEffect(() => {
        tasksActions.getAll().then()
        sessionStorage.setItem('page', 'tasks')
    }, [])

    useEffect(() => {
        if(connected) {
            profileActions.checkCookie().then((r) => {
                if (r) {
                    profileActions.getCurrentProfile().catch(r => console.log(r, "profile"))
                    tasksActions.getCompletedTasksId().catch(r => console.log(r, "tasks"))
                }
            })
        }
        setCompleteTask(false)
        setIsLoading(false)
    }, [completeTask, connected])

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
                                <div className={"mx-auto mt-[50px] md:mt-[100px] w-[90%] md:w-1/2 min-w-1/2 pb-[70px] md:pb-[130px]"}>
                                    {connected &&
                                        <TotalCard profile={profile}/>
                                    }
                                    <div
                                        className={'relative flex font-bold font-normal text-base md:text-2xl leading-[28px] place-items-center ' +
                                            'justify-center top-5 h-[80px] text-center text-white w-1/2 mx-auto rounded-2xl min-w-[200px] ' +
                                            'bg-[#000000] border-black border-[2px] border-solid py-3 px-5 gap-12 z-10'}>
                                        ЗАДАНИЯ
                                    </div>
                                    <TasksContent tasks={tasks} completedTasksId={completedTasksId.completedTaskIdList}
                                                  setCompleteTask={setCompleteTask} completeTask={completeTask}/>
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
                    )
            }
        </>
    )
}
