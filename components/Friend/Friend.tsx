import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@nextui-org/user";
import type { Prisma, User as PrismaUser } from "@prisma/client";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";

export type UserWithData = Prisma.UserGetPayload<{
	include: { userData: { include: { dataList: true } } };
}>;

export default function Friend(allUser: {
	allUser: UserWithData[] | undefined;
}) {
	if (!allUser)
		return (
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner label="Loading..." />
			</div>
		);
	return (
		<Listbox items={allUser.allUser}>
			{(user) => (
				<ListboxItem key={user.id}>
					<User
						key={user.id}
						name={user.name}
						description={`走行距離：${user.userData[0].dataList[0].mileage}Km`}
						avatarProps={{
							src: `${user.image}`,
						}}
					/>
				</ListboxItem>
			)}
		</Listbox>
	);
}
