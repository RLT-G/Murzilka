import React, { use, useContext, useEffect, useState } from "react";
import classes from "./index.module.css"
import Logo from "../Logo";
import Text from "../Text";
import PicLogo from "../PicLogo";
import Button from "../Button";
import { UserContext } from "../../context";
import { MetamaskService } from "../../api/MetamaskService";
import Tasks from "../../pages/Tasks";

const TasksData = ({ openWalletPopUp, openGuide, openBase }) => {
    const { isAuth, inStaking, setInStaking, totalMZK, totalPIC } = useContext(UserContext);
    const [ balance, setBalance ] = useState(0)
    const [value, setValue] = useState(0)
    const conversion = 1

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
                <div className={classes.MainContainer}>
                    <PicLogo className={classes.PicLogo} width={'50px'} height={'50px'}/>
                    <div className={classes.MainText}>
                        <Text black big bold>Картинки</Text>
                        <Text black bodl>Выполняйте задания, получайте картинки и затем сжигай их за токены от наших партнеров!</Text>
                    </div>
                </div>
                <div className={classes.Tasks}>
                    <div className={classes.TaskReward}>
                        <PicLogo width={'30px'} height={'30px'} />
                        <Text bold black>???</Text>
                    </div>
                    <Text bold black big>???</Text>
                </div>
                <div className={classes.Tasks}>
                    <div className={classes.TaskReward}>
                        <PicLogo width={'30px'} height={'30px'} />
                        <Text bold black>???</Text>
                    </div>
                    <Text bold black big>???</Text>
                </div>
                <div className={classes.Tasks}>
                    <div className={classes.TaskReward}>
                        <PicLogo width={'30px'} height={'30px'} />
                        <Text bold black>???</Text>
                    </div>
                    <Text bold black big>???</Text>
                </div>
                <div className={classes.Tasks}>
                    <div className={classes.TaskReward}>
                        <PicLogo width={'30px'} height={'30px'} />
                        <Text bold black>???</Text>
                    </div>
                    <Text bold black big>???</Text>
                </div>
                <div className={classes.Tasks}>
                    <div className={classes.TaskReward}>
                        <PicLogo width={'30px'} height={'30px'} />
                        <Text bold black>???</Text>
                    </div>
                    <Text bold black big>???</Text>
                </div>
                <div className={classes.TitleBlock}>
                    <Text big bold>ЗАДАНИЯ</Text>
                </div>
            </div>
        </>
    )
}

export default TasksData