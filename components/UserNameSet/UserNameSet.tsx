import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
} from "@nextui-org/react";
import type React from "react";

export default function UserNameSet() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<p onKeyDown={onOpen} onClick={onOpen} className="cursor-pointer m-0">
				ユーザー名の変更
			</p>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					<ModalBody>
						<Input name="name" placeholder=""></Input>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
