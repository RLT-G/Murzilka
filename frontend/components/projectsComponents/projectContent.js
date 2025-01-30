'use client'

import {ProjectItem} from "@/components/projectsComponents/projectItem";
import {Icon} from "@/components/common/Icon";
import {useEffect, useRef, useState} from "react";
import {ScrollShadow} from "@nextui-org/react";

export const ProjectContent = () => {
    const [opacityValue, setOpacityValue] = useState(100);
    const [isScrollable, setIsScrollable] = useState(false);
    const containerRef = useRef(null);


    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            setIsScrollable(container.scrollHeight > container.clientHeight);
        }
    }, [isScrollable])

    const handlerScroll = (event) => {
        if (Math.floor(event.target.scrollHeight) === Math.floor(event.target.scrollTop + event.target.clientHeight)) {
            setOpacityValue(0)
        } else {
            setOpacityValue(100)
        }

    }

    const handleToTheBottom = () => {
        const container = containerRef.current;

        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    return (
        <>
            <ScrollShadow onScroll={(event) => handlerScroll(event)} style={{
                "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 300px))"
            }} ref={containerRef} hideScrollBar
                          className="w-full grid justify-center gap-6 overflow-y-auto max-h-[70vh]">
                <ProjectItem/>
                <ProjectItem/>
                <ProjectItem/>
                <ProjectItem/>
            </ScrollShadow>
            {isScrollable &&
                <div onClick={() => {
                    handleToTheBottom()
                }}>
                    <Icon name={'scrollArrow'}
                          className={`relative cursor-pointer hover:scale-105 -left-[200px] h-[97px] w-[97px] duration-100 opacity-${opacityValue}`}/>
                </div>
            }

        </>
    )
}
