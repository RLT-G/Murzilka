import '@/public/css/style.css';
import '@/public/css/global.css';
import 'tailwindcss/tailwind.css';
import {CookiesProvider} from "next-client-cookies/server";
import {Providers} from "@/components/providers/providers";


export default function RootLayout({children}) {
    return <CookiesProvider>
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta
                httpEquiv="Content-Security-Policy"
                content="upgrade-insecure-requests"
            />
            <link rel="preload" href="%PUBLIC_URL%/video/murz.mp4" as="video" type="video/mp4"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
            />
            <title>
                Murzilka - платформа, где стейкаются ваши монеты
            </title>
            <link rel="shortcut icon" href="/assets/favicon.ico"/>

        </head>
        <body className={"overflow-x-hidden"}>
        <Providers>{children}</Providers>
        </body>
        </html>
    </CookiesProvider>
}
