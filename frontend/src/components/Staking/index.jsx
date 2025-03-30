import React, { use, useContext, useEffect, useState } from "react";
import classes from "./index.module.css"
import Logo from "../Logo";
import Text from "../Text";
import PicLogo from "../PicLogo";
import Button from "../Button";
import { UserContext } from "../../context";
import { MetamaskService } from "../../api/MetamaskService";

const Staking = ({ openWalletPopUp, openGuide, openBase }) => {
    const { isAuth, inStaking, setInStaking, totalMZK, totalPIC, mzkBalance, stakingAmount, setStakingAmount, updateInitValues } = useContext(UserContext);
    const [ balance, setBalance ] = useState(0)
    const [value, setValue] = useState(0)
    const conversion = 1

    useEffect(() => {setBalance(mzkBalance)}, [mzkBalance])
    
    const stakeTokens = async () => {
        if (balance != 0 && value != 0 && value <= balance) {
            const response = await MetamaskService.stakeTokens(value)
            if (response) {
                localStorage.setItem('inStaking', 'true')
                setInStaking(true)
                setStakingAmount(value)
                await updateInitValues()
            }
        }
    }
    const unstakeTokens = async () => {
        const response = await MetamaskService.unstakeTokens()
        if (response) {
            localStorage.removeItem('inStaking')
            setInStaking(false)
            await updateInitValues()
        }
    }

    const handleChange = (e) => {
        let newValue = e.target.value.replace(/\D/g, ""); // Удаляем нечисловые символы
        newValue = newValue === "" ? 0 : Math.max(1, Math.min(balance, Number(newValue))); // Обрезаем диапазон
        setValue(newValue);
    };

    useEffect(() => {
        if (isAuth) {
        }
    }, [isAuth])
    return (
        <>
            {isAuth && <div className={classes.StakingTotal}>
                <div className={classes.TotalMZK}>
                    <Text black bold>TOTAL MZK</Text>
                    <div className={classes.TotalMZKValue}>
                        <Logo width={'30px'} height={'30px'} />
                        <Text black>{totalMZK}</Text>
                    </div>
                </div>
                <div className={classes.TotalPIC}>
                    <Text black bold>TOTAL PIC</Text>
                    <div className={classes.TotalPICValue}>
                        <PicLogo width={'30px'} height={'30px'}/>
                        <Text black>{totalPIC}</Text>
                    </div>
                </div>
            </div>}

            <div className={classes.StakingWrapper} style={isAuth ? {marginTop: '62px'} : null}>
                <div className={classes.TitleContainer}>
                    <div className={classes.Title}>
                        <Logo width={'30px'} height={'30px'}/>
                        <Text black big>Стейкай MZK, получи PICS</Text>
                        <PicLogo width={'30px'} height={'30px'}/>
                    </div>
                    <Button className={classes.ButtonNew} onClick={openGuide}>Новичек?</Button>
                </div>
                <div className={classes.Conversion}>
                    <Text black big>ПОСМОТРИ НА КОНВЕРСИЮ СВОИХ МОНЕТ!</Text>
                    <div className={classes.ConversionInner}>
                        <div className={classes.Mzk}>
                            <Text black big>MZK</Text>
                            <div className={classes.MzkValue}>
                                <Logo width={'30px'} height={'30px'}/>
                                <Text black big>{inStaking ? stakingAmount : value}</Text>
                            </div>
                        </div>

                        <div className={classes.ConversionValue}>
                            <Text black big>1x</Text>
                        </div>
                        
                        <div className={classes.Pic}>
                            <Text black big>PIC</Text>
                            <div className={classes.PicValue}>
                                <PicLogo width={'30px'} height={'30px'}/>
                                <Text black big>{inStaking ? stakingAmount * conversion : value * conversion}</Text>
                            </div>
                        </div>
                    </div>
                    <div className={classes.ConversionButtons}>
                        <Button className={classes.ConversionButton} onClick={openBase}>Base</Button>
                        <Button className={classes.ConversionButton} disabled>[Redacted]</Button>
                    </div>
                </div>
                {!inStaking && <div className={classes.Range}>
                    <div className={classes.TextInput}>
                        <div className={classes.TextInputInner1}>
                            <Text black>Застейкано (MIN.1)</Text>
                            <input className={classes.Input} type="number" value={value} onChange={handleChange}/>
                        </div>
                        <Text className={classes.losttext} black>{isAuth ? balance - value : 69000000 - value} Потеряно Макс.</Text>
                    </div>


                    {!isAuth && <div className={classes.rangeContainer}>
                        <input
                            type="range"
                            min={0}
                            max={69000000}
                            step={69000}
                            value={value}
                            onChange={(e) => {setValue(e.target.value)}}
                            className={classes.customRange}
                        />
                    </div>}

                    {isAuth && balance != 0 && <div className={classes.rangeContainer}>
                        <input
                            type="range"
                            min={0}
                            max={balance}
                            step={balance / 100}
                            value={value}
                            onChange={(e) => {setValue(e.target.value)}}
                            className={classes.customRange}
                        />
                    </div>}

                    {isAuth && balance == 0 && <div className={classes.rangeContainer}>
                        <input
                            type="range"
                            min={0}
                            max={0}
                            step={0}
                            value={value}
                            onChange={(e) => {setValue(e.target.value)}}
                            disabled
                            className={[classes.customRange, classes.NonActive].join(' ')}
                        />
                    </div>}

                </div>}
                {!isAuth && <Button className={classes.WalletButton} onClick={openWalletPopUp} needWallet>
                    <Text big bold>
                        ПОДКЛЮЧИ<br />КОШЕЛЕК
                    </Text>
                </Button>}
                {isAuth && balance == 0 && <Button className={classes.WalletButton} onClick={() => {}}>
                    <Text big bold>
                        КУПИТЬ<br />MZK
                    </Text>
                </Button>}
                {isAuth && balance != 0 && !inStaking && <Button className={classes.WalletButton} onClick={stakeTokens}>
                    <Text big bold>
                        STAKE<br />MZK
                    </Text>
                </Button>}
                {isAuth && balance != 0 && inStaking && <Button className={classes.WalletButton} onClick={unstakeTokens}>
                    <Text big bold>
                        UNSTAKE<br />MZK
                    </Text>
                </Button>}

                <div className={classes.TitleBlock}>
                    <Text big bold>Начальная страница</Text>
                </div>
            </div>
        </>
    )
}

export default Staking