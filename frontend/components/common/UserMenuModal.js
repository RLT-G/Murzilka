import {UserMenu} from "@/components/common/UserMenu";
import {ModalBody, ModalHeader} from "@nextui-org/react";

export const UserMenuModal = ({onClose}) => {
    return <>
        <ModalHeader className="text-white text-center">
            <div className={"my-0 mx-auto"}>Кошелек</div>
        </ModalHeader>
        <ModalBody className={"px-3"}>
            <UserMenu onClose={onClose}/>
        </ModalBody>
    </>
}
