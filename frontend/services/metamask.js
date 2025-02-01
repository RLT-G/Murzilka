import Web3 from "web3";
import axios from "axios";
import { Constants } from "@/utils/common";


async function loginWithMetaMask() {
    console.log(1);
    if (!window.ethereum) {
        alert("Установите MetaMask!");
        return;
    }
    console.log(2);

    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const walletAddress = accounts[0];
    console.log(3);

    try {
        const { data: nonceData } = await axios.post(`${Constants.API_URL}api/metamask/nonce_generation/`, {
            wallet_address: walletAddress
        });
    console.log(4);

        const { nonce } = nonceData;

        const signature = await web3.eth.personal.sign(`Log in to Murzilka. Your nonce: ${nonce}`, walletAddress, "");

        const { data: authData } = await axios.post(`${Constants.API_URL}api/metamask/verify_signature_and_login/`, {
            wallet_address: walletAddress,
            signature: signature
        });
    console.log(5);

        const { refresh, access } = authData;

        console.log("JWT Token:", refresh, access);
    } catch (error) {
        console.error("Ошибка авторизации через MetaMask:", error.response?.data || error.message);
    }
}

export default loginWithMetaMask;
