"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Link } from "@nextui-org/react";

export default function Logout() {
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		return (
			<div>
					<Link className="cursor-pointer" color="danger" onClick={() => signOut()}>ログアウト</Link>
			</div>
		);
	}
	return null;
}
