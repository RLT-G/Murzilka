'use client'
import {useEffect, useRef} from "react";

export const BoxSlider = ({coinsForm, value, setInputValue, profile}) => {
    const MIN = 1;
    const sliderRef = useRef();

    const handleSliderInput = () => {
        setInputValue(sliderRef.current.value);
        coinsForm.setFieldValue('murzilkaCoins', sliderRef.current.value)
    }

    useEffect(() => {
        handleSliderInput();
    }, [sliderRef])


    return <div className={'range-slider'}>
        <div className="slider-container">
            <input type="range"
                   onInput={handleSliderInput}
                   min={MIN}
                   max={profile.totalStaked}
                   value={value}
                   ref={sliderRef}
                   step={1}
                   className={"slider"}/>
        </div>
    </div>
}
