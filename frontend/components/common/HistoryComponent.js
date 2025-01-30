import {
    Button,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from "@nextui-org/react";
import {useHistory} from "@/store";
import {useEffect} from "react";
import profileActions from "@/actions/profile";
import {getDate} from "@/utils/common";

export const HistoryComponent = ({onClose}) => {

    const history = useHistory();

    useEffect(() => {
        profileActions.getHistory().then()
    }, [])

    return (
        <>
            <ModalHeader className="text-white text-center">
                <div className={"text-2xl font-bold z-10"}>История</div>
            </ModalHeader>
            <ModalBody className={"flex flex-col gap-8"}>
                {history ?
                    <Table removeWrapper aria-label="Table" className="text-white text-center">
                        <TableHeader className={'text-black'}>
                            <TableColumn className={"text-center"}>ДЕЙСТВИЕ</TableColumn>
                            <TableColumn className={"text-center"}>MZK</TableColumn>
                            <TableColumn className={"text-center"}>ДАТА</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {history.map(item => {
                                return <TableRow key={item.id}>
                                    <TableCell className={"uppercase text-center"}>{item.activity}</TableCell>
                                    <TableCell className={"text-center"}>{item.activity === 'staked' ? '+' : '-'}{item.numberOfMzk}</TableCell>
                                    <TableCell className={"text-center"}>{getDate(item.createDate)}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                    :
                    <div className={"text-white text-sm font-normal"}>У вас еще нет истории стейкинга</div>
                }
            </ModalBody>
            <ModalFooter>
                <Button variant={'faded'} onPress={onClose}
                        className={"bg-[#E17777] border-black text-white btn"}>
                    Закрыть
                </Button>
            </ModalFooter>
        </>
    )
}
