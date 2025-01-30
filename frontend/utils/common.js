'use client'
import {usePathname} from "next/navigation";

export const convertNumberToUS = (inputValue) => {
    if (!convertNumberToUS)
        return null
    return new Intl.NumberFormat('en-US').format(inputValue);
};

export const getSlug = () => {
    const pathname = usePathname();
    const pathnameSplit = pathname.split('/');
    const decodedName = pathnameSplit[pathnameSplit.length - 1]
    return decodeURIComponent(decodedName);
}

export const Constants = {
    ym: process.env.YM,
    API_URL: process.env.REACT_APP_API_URL,
    PROD: process.env.PROD === 'production',
};

export const getDate = (date) =>{
    const start = new Date(date);
    let options1 = {weekday: 'long', day: '2-digit', month: 'short', year: 'numeric'};
    return new Intl.DateTimeFormat('en-US', options1).format(start);
}
