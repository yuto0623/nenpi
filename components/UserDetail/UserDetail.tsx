"use client";
import React from "react";
import { User } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export function UserDetail() {
	const { data: session, status } = useSession();
	return (
		<div>
			{status === "authenticated" ? (
				<User
					name={session.user?.name}
					description={session.expires}
					avatarProps={{
						src: `${session.user?.image}`,
					}}
				/>
			) : null}
		</div>
	);
}
