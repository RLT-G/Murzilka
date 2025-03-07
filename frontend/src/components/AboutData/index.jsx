import React from "react";
import classes from "./index.module.css"
import Logo from "../Logo";
import Text from "../Text";
import PicLogo from "../PicLogo";
import Button from "../Button";

const AboutData = ({ openWalletPopUp, openGuide, openBase }) => {
    return (
        <>
            <div className={classes.StakingWrapper}>
                <div className={classes.MainPart}>
                    <Text black bold big>Мурзилка - это первый проект на<br />просторах СНГ для сообщества<br />протоколов социальных ставок,<br />созданный командой опытных<br />разработчиков.</Text>
                </div>
                <div className={classes.SecondText}>
                    <div className={classes.Exclude}></div>
                    <Text black>Это платформа, которая позволяет пользователям ставить свои криптоактивы, такие как Мурзилка или другие монеты, чтобы зарабатывать новые токены на новых перспективных проектах</Text>
                </div>
                <div className={classes.SecondText}>
                    <div className={classes.Exclude2}></div>
                    <Text black>Это платформа, которая позволяет пользователям ставить свои криптоактивы, такие как Мурзилка или другие монеты, чтобы зарабатывать новые токены на новых перспективных проектах</Text>
                </div>
                <div className={classes.SecondText}>
                    <div className={classes.Exclude3}></div>
                    <Text black>Это платформа, которая позволяет пользователям ставить свои криптоактивы, такие как Мурзилка или другие монеты, чтобы зарабатывать новые токены на новых перспективных проектах</Text>
                </div>
                <div className={classes.SecondText}>
                    <div className={classes.Exclude4}></div>
                    <Text black>Это платформа, которая позволяет пользователям ставить свои криптоактивы, такие как Мурзилка или другие монеты, чтобы зарабатывать новые токены на новых перспективных проектах</Text>
                </div>

                <Button className={classes.WalletButton} onClick={openWalletPopUp} needWallet>
                    <Text big bold>
                        ПОДКЛЮЧИ<br />КОШЕЛЕК
                    </Text>
                </Button>

                <div className={classes.TitleBlock}>
                    <Text big bold>О нас</Text>
                </div>
            </div>
        </>
    )
}

export default AboutData