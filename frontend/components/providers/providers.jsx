'use client';

import {NextUIProvider} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {WalletProvider} from "@tronweb3/tronwallet-adapter-react-hooks";

export function Providers({children}) {

    const router = useRouter();

    return <NextUIProvider navigate={router.push}>
        <WalletProvider>
            {children}
        </WalletProvider>
    </NextUIProvider>;
}
