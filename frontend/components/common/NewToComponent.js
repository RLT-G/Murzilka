import {Button, ModalBody, ModalFooter, ModalHeader} from "@nextui-org/react";

export const NewToComponent = ({onClose}) => {
    return <>
        <ModalHeader className="flex flex-col gap-1 text-white text-center">Murzilka Guide</ModalHeader>
        <ModalBody className={"text-white text-justify indent-3"}>
            <div>
                Добро пожаловать в Мурзилку, старый детский журнал, где вы сможете окунуться в мир
                ярких картинок!
            </div>

            <div className={"text-foreground text-xs text-sm font-bold text-white"}>Стейкай MZK, получи PICS!</div>

            <ul className={"list-disc list-inside"} >
                <li>Застейкайте ваши Murzlika COIN (MZK), чтобы получить PICS</li>
                <li>Чем больше MZK вы стейкнете, тем больше PICS вы получите</li>
                <li>Чем дольше ваши монеты остаются в стейкинге, тем больше будет буст</li>
                <li>Вывел из стейкинга? Большая ошибка. вы получите ваши MZK обратно, но вы потеряете ваш картинки и
                    рискнете вашими бустами
                </li>
            </ul>
        </ModalBody>
        <ModalFooter>
            <Button className={'text-white bg-[#E17777] border-black btn'}
                    variant={'faded'} onPress={onClose}>
                Закрыть
            </Button>
        </ModalFooter>
    </>
}
