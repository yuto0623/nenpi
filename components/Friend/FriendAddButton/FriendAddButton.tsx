import AddIcon from "@mui/icons-material/Add";
import { Button } from "@nextui-org/react";

export default function FriendAddButton() {
	return (
		<Button isIconOnly className="fixed bottom-20 right-5 p-2" size="lg">
			<AddIcon />
		</Button>
	);
}
