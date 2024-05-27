import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import type React from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function UserNameSet() {
	const { data: session, status, update } = useSession();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onSubmit = async (formData: FormData) => {
		// console.log(session?.user?.id);
		const putBody = {
			name: formData.get("name"),
		};
		const response = await axios.patch(
			`/api/user/${session?.user?.id}`,
			JSON.stringify(putBody),
		);
		update({ user: { name: formData.get("name") } });
	};

	return (
		<>
			<p
				onKeyDown={onOpen}
				onClick={onOpen}
				className="cursor-pointer m-0 text-sm"
			>
				ユーザー名の変更
			</p>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>ユーザー名の変更</ModalHeader>
							<ModalBody>
								<form action={onSubmit}>
									<Input
										name="name"
										placeholder={session?.user?.name || ""}
										autoFocus
									/>
									<Button className="mt-2" type="submit" onPress={onClose}>
										変更
									</Button>
								</form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
