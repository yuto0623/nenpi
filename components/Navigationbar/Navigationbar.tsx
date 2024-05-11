"use client";
import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
} from "@nextui-org/react";
import { ThemeSwitcher } from "../Button/ThemeSwitcher";
import { UserDetail } from "../UserDetail/UserDetail";
import Logout from "../Logout/Logout";
import Settings from "../Settings/Settings";

export function Navigationbar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle />
				<NavbarBrand>
					<p className="font-bold text-inherit">test</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex">
				<UserDetail />
				<NavbarBrand>
					<p className="font-bold text-inherit">test</p>
				</NavbarBrand>
				<NavbarItem>
					<Settings />
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				<UserDetail />
				<NavbarMenuItem>
					<Settings />
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Logout />
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}
