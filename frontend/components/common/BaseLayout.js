"use server";
import {Navbar} from "@/components/common/Navbar";
import {redirect} from 'next/navigation';
import {Footer} from "@/components/common/Footer";

export default async function BaseLayout({
                                             Component,
                                             navbarOn,
                                             footerOn,
                                             pageProps,
                                             redirectCondition,
                                             redirectUrl
                                         }) {

    let hasProfile = false;
    let profile = null;

    if (redirectUrl && redirectCondition && redirectCondition(hasProfile, profile)) {
        redirect(redirectUrl)
    }

    return (
        <main>
            {navbarOn && <Navbar hasProfile={hasProfile} profile={profile}/>}
            {!!Component ? <Component hasProfile={hasProfile} profile={profile} {...pageProps}/> : null}
            {footerOn && <Footer hasProfile={hasProfile}/>}
        </main>
    )
}
