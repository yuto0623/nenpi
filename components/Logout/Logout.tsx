import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Link } from "@nextui-org/react";

export default function Logout() {
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		return (
			<div>
				<button type="button" onClick={() => signOut()}>
					<Link color="foreground">ログアウト</Link>
				</button>
			</div>
		);
	}
	return null;
}
