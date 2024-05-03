"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSetTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	if (!mounted) return null;

	return (
		<div>
			<button
				type="button"
				className="block p-1 rounded-full"
				onClick={handleSetTheme}
			>
				{theme === "light" ? <p>dark</p> : <p>light</p>}
			</button>
		</div>
	);
}
