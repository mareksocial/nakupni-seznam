import { useState, useEffect } from "react";

export function useDarkMode() {
    const [theme, setTheme] = useState("light");
    const colorTheme = theme === "light" ? "dark" : "light";

    useEffect(() => {
        const root: HTMLElement = window.document.documentElement;

        root.classList.remove(colorTheme);
        root.classList.add(theme);
        }, [setTheme, colorTheme]);
        return [setTheme, colorTheme]

}