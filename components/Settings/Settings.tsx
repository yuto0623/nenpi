import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Link,
} from "@nextui-org/react";

export default function Settings() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Link color="foreground" onPress={onOpen} className="cursor-pointer">
				Settings
			</Link>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Settings
							</ModalHeader>
							<ModalBody>
								<p>Modal Body</p>
							</ModalBody>
							<ModalFooter>
								<p>Modal Footer</p>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
