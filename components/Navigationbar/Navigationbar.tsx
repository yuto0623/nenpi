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

export function Navigationbar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle />
				<NavbarBrand>
					<p className="font-bold text-inherit">ねんぴはかる！</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex">
				<UserDetail />
				<NavbarBrand>
					<p className="font-bold text-inherit">ねんぴはかる！</p>
				</NavbarBrand>
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				<UserDetail />
				<NavbarMenuItem>
					<Logout />
				</NavbarMenuItem>
				<ThemeSwitcher />
			</NavbarMenu>
		</Navbar>
	);
}
