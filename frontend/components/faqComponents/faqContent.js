import {Accordion, AccordionItem, Button, Image, ScrollShadow} from "@nextui-org/react";
import profileActions from "@/actions/profile";

export const FaqContent = () => {

    const itemClasses = {
        title: "text-xl font-bold leading-7 p-4",
        content: "p-4 pt-0 font-normal text-base text-justify indent-4",
    };

    const BackArrowImage = () => {
        return <Image width={20} height={20} src={"../assets/BackArrow.png"} className={"mr-[20px]"}/>
    }


    return (
        <ScrollShadow hideScrollBar className="w-full h-[70vh] md:h-[60vh]">
            <Accordion variant="splitted" itemClasses={itemClasses}>
                <AccordionItem key="1" aria-label="Как работает Мурзилка?" indicator={<BackArrowImage/>}
                               title="Как работает Мурзилка?"
                               className={"border-black border-[2px]"}>
                    <div className={"pb-3 indent-0 font-bold text-base md:text-lg"}>Ответ:</div>
                    <div className={"flex flex-col gap-4"}>
                        <div>Пользователи ставят Мурзилку и другие криптоактивы, чтобы получить Картины.</div>
                        <div>Картины “сжигаются” за новые токены, запущенные на Мурзилке.</div>
                        <div>Пользователи участвуют в простых и веселых квестах, чтобы узнать больше о новых проектах.
                        </div>
                        <div>Новые проекты получают сообщество заинтересованных и информированных участников (не ботов)
                            в
                            качестве первых сторонников.
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Сколько стоит Мурзилка?" indicator={<BackArrowImage/>}
                               title="Сколько стоит Мурзилка?"
                               className={"border-black border-[2px]"}>
                    <div className={"pb-3 indent-0 font-bold text-base md:text-lg"}>Ответ:</div>
                    <div className={"flex flex-col gap-4"}>
                        <div>Мурзилка - это платформа с НУЛЕВОЙ КОМИССИЕЙ, которая способствует созданию системы равного
                            распределения, ориентированной на сообщество.
                        </div>
                        <div>Пользователи могут выбирать, когда делать ставки, и выводить свои криптоактивы в любое
                            время с НУЛЕВОЙ КОМИССИЕЙ (за исключением платы за газ).
                        </div>
                        <div>Новым проектам, работающим с Мурзилка, не нужно беспокоиться о "демпинге поставщиков”,
                            поскольку 100% пожертвований поступают сообществу Мурзилка, заменяя традиционный “маркетинг
                            влияния ”, Мурзилка является связующим звеном между новыми проектами и массами, создавая
                            беспроигрышную ситуацию.
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Что такое криптовалютный аирдроп?" indicator={<BackArrowImage/>}
                               title="Что такое криптовалютный аирдроп?" className={"border-black border-[2px]"}>
                    <div className={"pb-3 indent-0 font-bold text-base md:text-lg"}>Ответ:</div>
                    <div className={"flex flex-col gap-4"}>
                        <div>Аирдроп - это еще один термин, обозначающий бесплатные криптовалюты. Эти бесплатные
                            криптовалюты (также называемые монетами или токенами) распространяются новыми проектами. Это
                            их собственные и новые монеты. Таким образом, маловероятно, что вы получите биткоины или
                            ethereum в этих дропах. Вы получите POLY, OMG, QE и другие монеты. На самом деле мы также не
                            знаем большинства токенов, потому что они раздают их только тем, кто их использует, еще до
                            того, как они их продадут
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem key="4" aria-label="Почему компании раздают бесплатные криптовалюты?"
                               indicator={<BackArrowImage/>}
                               title="Почему компании раздают бесплатные криптовалюты?"
                               className={"border-black border-[2px]"}>
                    <div className={"pb-3 text indent-0 font-bold text-base md:text-lg"}>Ответ:</div>
                    <div className={"flex flex-col gap-4"}>
                        <div>
                            Чтобы криптовалюта была полезной и чего-то стоила, ею должны пользоваться люди, а этого
                            трудно достичь. Раздавая бесплатные токены, вы можете добиться сетевого эффекта. Это простой
                            способ создать большое сообщество, потому что все любят бесплатные токены.
                        </div>
                        <div>
                            Еще одна цель этого - привлечь внимание людей к проекту. Всякий раз, когда они
                            просматривают CoinMarketCap или видят логотип бесплатной монеты в другом месте, они знают
                            это. В конечном итоге это даже позволит им купить токены, поскольку проект им нравится.
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem key="5" aria-label="Бесплатные токены имеют ценность?" indicator={<BackArrowImage/>}
                               title="Бесплатные токены имеют ценность?" className={"border-black border-[2px]"}>
                    <div className={"pb-3 text indent-0 font-bold text-base md:text-lg"}>Ответ:</div>
                    <div className={"flex flex-col gap-4"}>
                        <div>
                            Да! Вы можете подумать, что только потому, что вы получаете эти токены бесплатно, они того
                            не стоят. Однако, как уже упоминалось, эти токены обычно распространяются перед продажей с
                            целью проведения маркетинга. Как правило, для аирдропа доступно не более 1% всех токенов.
                            Остальные все еще в продаже. Таким образом, бесплатные токены также имеют ценность
                        </div>
                        <div>
                            Еще одна цель этого - привлечь внимание людей к проекту. Всякий раз, когда они
                            просматривают CoinMarketCap или видят логотип бесплатной монеты в другом месте, они знают
                            это. В конечном итоге это даже позволит им купить токены, поскольку проект им нравится.
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem key="6" aria-label="Что мне нужно для участия?" indicator={<BackArrowImage/>}
                               title="Что мне нужно для участия?" className={"border-black border-[2px]"}>
                    <div className={"pb-3 text indent-0 font-bold text-base md:text-lg"}>Ответ:</div>
                    <div className={"flex flex-col gap-4"}>
                        <div>
                            Чтобы получить эти аирдропы, вам обычно нужно выполнить небольшие задачи, такие как
                            присоединение к группе чата Telegram или подписка на их аккаунт в Twitter, но только до
                            окончания аирдропа. После получения токенов вы можете покинуть каналы. В большинстве случаев
                            это так называемые токены ERC20, криптовалюта, основанная на платформе Ethereum. Поэтому
                            необходимо, чтобы у вас был хотя бы один адрес кошелька Ethereum.
                        </div>
                        <div>
                            Для подведения итогов: С помощью этих четырех инструментов вы должны иметь право участвовать
                            примерно в 90% всех дропов, которые мы размещаем здесь, на ____________:
                        </div>
                        <div>
                            Вы также можете использовать аппаратные кошельки, такие как Ledger Nano S. Но НЕ используйте
                            адрес кошелька биржи.
                            Иногда вам нужны и другие инструменты или даже личные данные. Взгляните на значки в списке
                            дропов. Они за считанные секунды расскажут вам, какие инструменты требуются и можете ли вы
                            принять участие. Вы также можете использовать наш встроенный фильтр, чтобы показывать только
                            заявки, в которых вы можете участвовать.
                        </div>

                        <ul className={"list-disc list-inside"}>
                            <li>Адрес электронной почты: Мы рекомендуем создать специальный для аирдропов</li>
                            <li>Аккаунт в Telegram: <a href={"https://telegram.org/"}
                                                       className={"text-blue-400"}>https://telegram.org/</a></li>
                            <li>Аккаунт в Twitter: <a href={"https://twitter.com/"}
                                                      className={"text-blue-400"}>https://twitter.com/</a></li>
                            <li>Адрес кошелька Ethereum: Мы рекомендуем - <a href={"https://metamask.io/"}
                                                                             className={"text-blue-400"}>https://metamask.io/</a>
                            </li>
                        </ul>

                        <div>
                            <i className={"font-bold"}>НИКОГДА</i> никому не передавайте свой <i
                            className={"font-bold"}>ПРИВАТНЫЙ КЛЮЧ</i>, а также никаким airdrop!
                            Сообщайте
                            только свой <i className={"font-bold"}>публичный адрес</i> - это совершенно нормально и даже
                            необходимо!
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem key="7" aria-label="Где я могу продать свою криптовалюту с аирдропом?"
                               indicator={<BackArrowImage/>}
                               title="Где я могу продать свою криптовалюту с аирдропом?"
                               className={"border-black border-[2px]"}>
                    <div className={"pb-3 text indent-0 font-bold text-base md:text-lg"}>Ответ:</div>
                    <div className={"flex flex-col gap-4"}>
                        <div>
                            На различных биржах. Поскольку криптовалюты в основном поступают от новых компаний, они еще
                            не котируются на крупных биржах, таких как Binance. Однако существуют еще десятки небольших
                            бирж. Вы можете проверить веб-сайт токена или Twitter. Обычно широко объявляются новые
                            биржевые списки. Затем вам нужно только создать учетную запись на бирже, и вы обычно можете
                            обменять $ .
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        </ScrollShadow>
    )
}
