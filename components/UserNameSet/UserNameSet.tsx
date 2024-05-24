import {
	Button,
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
			<Button onPress={onOpen}>test</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					<ModalBody>
						<p>test</p>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
