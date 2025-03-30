import api from "./ApiService";
import Web3 from "web3";
import axios from "axios";
import { STAKING_ABI, STAKING_CONTRACT_ADDRESS, TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from "../constans";
import StakingService from "./StakingService";


export class MetamaskService {
    static async loginViaMetamask() {
        console.log(1111)
        if (!window.ethereum) {
            alert("Установите MetaMask!")
            return
        }
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const walletAddress = accounts[0];

        try {

            const { data: nonceData } = await api.post('/metamask/nonce_generation/', {
                wallet_address: walletAddress
            });
            
            const { nonce } = nonceData;
    
            const signature = await web3.eth.personal.sign(`Вход в Мурзилку. Ваш Nonce: ${nonce}`, walletAddress, "");
    
            const { data: authData } = await api.post('/metamask/verify_signature_and_login/', {
                wallet_address: walletAddress,
                signature: signature
            });
            
            // const { refresh, access } = authData;
            return { authData: authData, walletAddress: walletAddress }

        } catch (error) {
            console.error("Ошибка авторизации через MetaMask:", error);
            return null;
        }
    }

    static async getTokenBalance(walletAddress) {
        if (!window.ethereum) {
            console.error("MetaMask не установлен");
            return null;
        }
        
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(TOKEN_ABI, TOKEN_CONTRACT_ADDRESS);
        
        try {
            const balance = await contract.methods.balanceOf(walletAddress).call();
            return web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error("Ошибка получения баланса токенов:", error);
            return null;
        }
    }

    static async stakeTokens(amount) {
        if (!window.ethereum) {
            console.error("MetaMask не установлен");
            return;
        }
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        
        const stakingContract = new web3.eth.Contract(STAKING_ABI, STAKING_CONTRACT_ADDRESS);
        const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_CONTRACT_ADDRESS);

        const amountInWei = web3.utils.toWei(amount.toString(), "ether");
        try {
            const approvalTx = await tokenContract.methods.approve(STAKING_CONTRACT_ADDRESS, amountInWei).send({ from: userAddress });
    
            console.log("Одобрение выполнено, approvalTx:", approvalTx.transactionHash);
    
            const stakeTx = await stakingContract.methods.stake(amountInWei).send({ from: userAddress });
    
            console.log("Стейкинг выполнен, stakeTx:", stakeTx.transactionHash);
            
            const result = await StakingService.stake(stakeTx.transactionHash)
            console.log('Ответ от сервера: ', result)

            return true
        } catch (error) {
            console.error("Ошибка при стейкинге:", error);
            return null;
        }
    }

    static async unstakeTokens() {
        if (!window.ethereum) {
            console.error("MetaMask не установлен");
            return;
        }
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        const stakingContract = new web3.eth.Contract(STAKING_ABI, STAKING_CONTRACT_ADDRESS);
        
        try {
            const unstakeTx = await stakingContract.methods.unstake().send({ from: userAddress });
            const th = unstakeTx.transactionHash
            console.log("Вывод токенов выполнен, unstakeTx:", th);

            const result = await StakingService.unstake(th)
            console.log('Ответ от сервера: ', result)

            return true
        } catch (error) {
            console.error("Ошибка при выводе токенов:", error);
            return null;
        }

    }
} 