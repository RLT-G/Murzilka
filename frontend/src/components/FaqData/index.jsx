import React, { useState } from "react";
import classes from "./index.module.css"
import Text from "../Text";

const FaqData = () => { 
    const [ ans1IsOpen, setAns1IsOpen ] = useState(false)
    const changeAns1 = () => {
        if (ans1IsOpen) { setAns1IsOpen(false) }
        else { setAns1IsOpen(true) }
    }

    const [ ans2IsOpen, setAns2IsOpen ] = useState(false)
    const changeAns2 = () => {
        if (ans2IsOpen) { setAns2IsOpen(false) }
        else { setAns2IsOpen(true) }
    }

    const [ ans3IsOpen, setAns3IsOpen ] = useState(false)
    const changeAns3 = () => {
        if (ans3IsOpen) { setAns3IsOpen(false) }
        else { setAns3IsOpen(true) }
    }

    const [ ans4IsOpen, setAns4IsOpen ] = useState(false)
    const changeAns4 = () => {
        if (ans4IsOpen) { setAns4IsOpen(false) }
        else { setAns4IsOpen(true) }
    }

    const [ ans5IsOpen, setAns5IsOpen ] = useState(false)
    const changeAns5 = () => {
        if (ans5IsOpen) { setAns5IsOpen(false) }
        else { setAns5IsOpen(true) }
    }

    const [ ans6IsOpen, setAns6IsOpen ] = useState(false)
    const changeAns6 = () => {
        if (ans6IsOpen) { setAns6IsOpen(false) }
        else { setAns6IsOpen(true) }
    }

    const [ ans7IsOpen, setAns7IsOpen ] = useState(false)
    const changeAns7 = () => {
        if (ans7IsOpen) { setAns7IsOpen(false) }
        else { setAns7IsOpen(true) }
    }

    return (
        <>
            <div className={classes.FaqDataContainer}>
                <div className={classes.QAndAns}>
                    <div className={classes.Q} onClick={changeAns1}>
                        <Text black bold big>Как работает Мурзилка?</Text>
                        <div className={[classes.Arrow, ans1IsOpen ? classes.ArrowOpen : classes.ArrowClose].join(' ')}></div>
                    </div>
                    <div className={[classes.Ans, ans1IsOpen ? classes.Open : classes.Close].join(' ')}>
                        <Text black bold>Ответ:</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Пользователи ставят Мурзилку и другие криптоактивы, чтобы получить Картины.</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Картины “сжигаются” за новые токены, запущенные на Мурзилке.</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Пользователи участвуют в простых и веселых квестах, чтобы узнать больше о новых проектах.</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Новые проекты получают сообщество заинтересованных и информированных участников (не ботов) в качестве первых сторонников.</Text>

                    </div>
                </div>

                <div className={classes.QAndAns}>
                    <div className={classes.Q} onClick={changeAns2}>
                        <Text black bold big>Сколько стоит Мурзилка?</Text>
                        <div className={[classes.Arrow, ans2IsOpen ? classes.ArrowOpen : classes.ArrowClose].join(' ')}></div>
                    </div>
                    <div className={[classes.Ans, ans2IsOpen ? classes.Open : classes.Close].join(' ')}>
                        <Text black bold>Ответ:</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Мурзилка - это платформа с НУЛЕВОЙ КОМИССИЕЙ, которая способствует созданию системы равного распределения, ориентированной на сообщество.</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Пользователи могут выбирать, когда делать ставки, и выводить свои криптоактивы в любое время с НУЛЕВОЙ КОМИССИЕЙ (за исключением платы за газ).</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Новым проектам, работающим с Мурзилка, не нужно беспокоиться о "демпинге поставщиков”, поскольку 100% пожертвований поступают сообществу Мурзилка, заменяя традиционный “маркетинг влияния ”, Мурзилка является связующим звеном между новыми проектами и массами, создавая беспроигрышную ситуацию.</Text>
                    </div>
                </div>

                <div className={classes.QAndAns}>
                    <div className={classes.Q} onClick={changeAns3}>
                        <Text black bold big>Что такое криптовалютный аирдроп?</Text>
                        <div className={[classes.Arrow, ans3IsOpen ? classes.ArrowOpen : classes.ArrowClose].join(' ')}></div>
                    </div>
                    <div className={[classes.Ans, ans3IsOpen ? classes.Open : classes.Close].join(' ')}>
                        <Text black bold>Ответ:</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Аирдроп - это еще один термин, обозначающий бесплатные криптовалюты. Эти бесплатные криптовалюты (также называемые монетами или токенами) распространяются новыми проектами. Это их собственные и новые монеты. Таким образом, маловероятно, что вы получите биткоины или ethereum в этих дропах. Вы получите POLY, OMG, QE и другие монеты. На самом деле мы также не знаем большинства токенов, потому что они раздают их только тем, кто их использует, еще до того, как они их продадут</Text>
                    </div>
                </div>

                <div className={classes.QAndAns}>
                    <div className={classes.Q} onClick={changeAns4}>
                        <Text black bold big>Почему компании раздают бесплатные токены?</Text>
                        <div className={[classes.Arrow, ans4IsOpen ? classes.ArrowOpen : classes.ArrowClose].join(' ')}></div>
                    </div>
                    <div className={[classes.Ans, ans4IsOpen ? classes.Open : classes.Close].join(' ')}>
                        <Text black bold>Ответ:</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Чтобы криптовалюта была полезной и чего-то стоила, ею должны пользоваться люди, а этого трудно достичь. Раздавая бесплатные токены, вы можете добиться сетевого эффекта. Это простой способ создать большое сообщество, потому что все любят бесплатные токены.</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Еще одна цель этого - привлечь внимание людей к проекту. Всякий раз, когда они просматривают CoinMarketCap или видят логотип бесплатной монеты в другом месте, они знают это. В конечном итоге это даже позволит им купить токены, поскольку проект им нравится.</Text>
                    </div>
                </div>

                <div className={classes.QAndAns}>
                    <div className={classes.Q} onClick={changeAns5}>
                        <Text black bold big>Бесплатные токены имеют ценность?</Text>
                        <div className={[classes.Arrow, ans5IsOpen ? classes.ArrowOpen : classes.ArrowClose].join(' ')}></div>
                    </div>
                    <div className={[classes.Ans, ans5IsOpen ? classes.Open : classes.Close].join(' ')}>
                        <Text black bold>Ответ:</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Да! Вы можете подумать, что только потому, что вы получаете эти токены бесплатно, они того не стоят. Однако, как уже упоминалось, эти токены обычно распространяются перед продажей с целью проведения маркетинга. Как правило, для аирдропа доступно не более 1% всех токенов. Остальные все еще в продаже. Таким образом, бесплатные токены также имеют ценность</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Еще одна цель этого - привлечь внимание людей к проекту. Всякий раз, когда они просматривают CoinMarketCap или видят логотип бесплатной монеты в другом месте, они знают это. В конечном итоге это даже позволит им купить токены, поскольку проект им нравится.</Text>
                    </div>
                </div>

                <div className={classes.QAndAns}>
                    <div className={classes.Q} onClick={changeAns6}>
                        <Text black bold big>Что мне нужно для участия?</Text>
                        <div className={[classes.Arrow, ans6IsOpen ? classes.ArrowOpen : classes.ArrowClose].join(' ')}></div>
                    </div>
                    <div className={[classes.Ans, ans6IsOpen ? classes.Open : classes.Close].join(' ')}>
                        <Text black bold>Ответ:</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Чтобы получить эти аирдропы, вам обычно нужно выполнить небольшие задачи, такие как присоединение к группе чата Telegram или подписка на их аккаунт в Twitter, но только до окончания аирдропа. После получения токенов вы можете покинуть каналы. В большинстве случаев это так называемые токены ERC20, криптовалюта, основанная на платформе Ethereum. Поэтому необходимо, чтобы у вас был хотя бы один адрес кошелька Ethereum.</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Для подведения итогов: С помощью этих четырех инструментов вы должны иметь право участвовать примерно в 90% всех дропов, которые мы размещаем здесь, на ____________:</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Вы также можете использовать аппаратные кошельки, такие как Ledger Nano S. Но НЕ используйте адрес кошелька биржи. Иногда вам нужны и другие инструменты или даже личные данные. Взгляните на значки в списке дропов. Они за считанные секунды расскажут вам, какие инструменты требуются и можете ли вы принять участие. Вы также можете использовать наш встроенный фильтр, чтобы показывать только заявки, в которых вы можете участвовать.</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Адрес электронной почты: Мы рекомендуем создать специальный для аирдропов</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Аккаунт в Telegram: https://telegram.org/</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Аккаунт в Twitter: https://twitter.com/</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;Адрес кошелька Ethereum: Мы рекомендуем - https://metamask.io/</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;НИКОГДА никому не передавайте свой ПРИВАТНЫЙ КЛЮЧ, а также никаким airdrop! Сообщайте только свой публичный адрес - это совершенно нормально и даже необходимо!</Text>
                    </div>
                </div>

                <div className={classes.QAndAns}>
                    <div className={classes.Q} onClick={changeAns7}>
                        <Text black bold big>Где я могу продать свою криптовалюту с аирдропом?</Text>
                        <div className={[classes.Arrow, ans7IsOpen ? classes.ArrowOpen : classes.ArrowClose].join(' ')}></div>
                    </div>
                    <div className={[classes.Ans, ans7IsOpen ? classes.Open : classes.Close].join(' ')}>
                        <Text black bold>Ответ:</Text>
                        <Text black>&nbsp;&nbsp;&nbsp;&nbsp;На различных биржах. Поскольку криптовалюты в основном поступают от новых компаний, они еще не котируются на крупных биржах, таких как Binance. Однако существуют еще десятки небольших бирж. Вы можете проверить веб-сайт токена или Twitter. Обычно широко объявляются новые биржевые списки. Затем вам нужно только создать учетную запись на бирже, и вы обычно можете обменять $ .</Text>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqData