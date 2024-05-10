"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { Switch } from "@nextui-org/react";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div>
			<Switch
				size="md"
				color={"warning"}
				aria-label="テーマの切り替え"
				isSelected={theme === "light"}
				onValueChange={(selected) => {
					setTheme(selected ? "light" : "dark");
				}}
				thumbIcon={({ isSelected, className }) =>
					isSelected ? (
						<SunIcon className={`${className}`} />
					) : (
						<MoonIcon className={className} />
					)
				}
			/>
		</div>
	);
}
