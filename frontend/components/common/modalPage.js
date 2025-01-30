import {Modal, ModalContent} from "@nextui-org/react";

export const ModalPage = ({isOpen, onOpenChange, Component, size, placement}) => {
    return <Modal placement={placement || "center"} size={size || "md"} className={"bg-black"} isOpen={isOpen}
                  onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <Component onClose={onClose}/>
            )}
        </ModalContent>
    </Modal>
}
