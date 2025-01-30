import {AccordionItem} from "@nextui-org/react";

export const FaqItem = ({title}) => {
    return (
        <AccordionItem key="1" aria-label="Как работает Мурзилка?" title="Как работает Мурзилка?"
                       className={"border-black border-[2px]"}>
            <div className={"pb-3 text indent-0 font-bold text-lg"}>Ответ:</div>
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
    )
}