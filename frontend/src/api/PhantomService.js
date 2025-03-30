import api from "./ApiService";
import Web3 from "web3";
import axios from "axios";
import { STAKING_ABI, STAKING_CONTRACT_ADDRESS, TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from "../constans";
import StakingService from "./StakingService";
import { Connection, PublicKey } from "@solana/web3.js";

export class PhantomService {
    static async loginViaPhantom() {
        if (!window.solana || !window.solana.isPhantom) {
            alert("Установите Phantom Wallet!");
            return;
        }
        try {
            const response = await window.solana.connect();
            const publicKey = response.publicKey.toString();
            const message = `Login to MyApp at ${new Date().toISOString()}`;
            const encodedMessage = new TextEncoder().encode(message);
            const signedMessage = await window.solana.signMessage(encodedMessage, "utf8");

            const { data: authData } = await api.post('/phantom/verify_signature_and_login/', {
                public_key: publicKey,
                message: message,
                signature: Array.from(signedMessage.signature) // Преобразуем в массив чисел
            });
            
            console.log(authData)
            return { authData: authData, walletAddress: publicKey }

        } catch (error) {
            console.log('Phantom login error: ', error);
        }
    }

    static async getSolBalance(walletAddress) {
        // const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
        const connection = new Connection("https://api.testnet.solana.com", "confirmed");
        try {
            const publicKey = new PublicKey(walletAddress);
            const balance = await connection.getBalance(publicKey);
            console.log(balance)
            const solBalance = balance / 1e9;
            console.log(solBalance)
            return solBalance;

        } catch (error) {
            console.error("Ошибка при получении баланса:", error);
        }
    }

    static async stakeTokens(amount) {
    }

    static async unstakeTokens() {
    }
} 




// const PhantomLogin = () => {
//     const [wallet, setWallet] = useState(null);

//     const connectWallet = async () => {
//         if (!window.solana || !window.solana.isPhantom) {
//             alert("Установите Phantom Wallet!");
//             return;
//         }

//         try {
//             const response = await window.solana.connect();
//             const publicKey = response.publicKey.toString();

//             // Генерируем сообщение для подписи
//             const message = `Login to MyApp at ${new Date().toISOString()}`;
//             const encodedMessage = new TextEncoder().encode(message);
//             const signedMessage = await window.solana.signMessage(encodedMessage, "utf8");

//             // Отправляем данные на backend
//             const res = await fetch("http://localhost:8000/api/auth/phantom/", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     public_key: publicKey,
//                     message,
//                     signature: Array.from(signedMessage.signature), // Преобразуем Uint8Array в массив
//                 }),
//             });

//             const data = await res.json();
//             if (data.token) {
//                 setWallet(publicKey);
//                 localStorage.setItem("token", data.token);
//                 alert("Успешный вход!");
//             } else {
//                 alert("Ошибка авторизации");
//             }
//         } catch (err) {
//             console.error(err);
//         }
//   };

//   return (
//         <div>
//             <button onClick={connectWallet}>Войти через Phantom</button>
//             {wallet && <p>Подключен: {wallet}</p>}
//         </div>
//   );
// };

