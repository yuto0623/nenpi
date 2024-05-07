import React from "react";
import { useSession, signIn } from "next-auth/react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Spinner,
} from "@nextui-org/react";

export default function Login() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner label="Loading..." />
			</div>
		);
	}

	if (status !== "authenticated") {
		return (
			<Card className="w-2/3 max-w-80 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<CardHeader>Login</CardHeader>
				<CardBody>
					<Button
						type="button"
						onClick={() => signIn("google", {}, { prompt: "login" })}
					>
						Googleでログイン
					</Button>
				</CardBody>
			</Card>
		);
	}

	return null;
}
