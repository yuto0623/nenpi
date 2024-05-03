import React from "react";
import { User } from "@nextui-org/react";

export function UserDetail() {
	return (
		<div>
			<User
				name="yuto shintani"
				description="走行距離 1,000km"
				avatarProps={{
					src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
				}}
			/>
		</div>
	);
}
