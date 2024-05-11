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
import { ThemeSwitcher } from "../Button/ThemeSwitcher";
import Logout from "../Logout/Logout";

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
								<div className="flex">
									ナイトモード：
									<ThemeSwitcher />
								</div>
								<Logout />
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
