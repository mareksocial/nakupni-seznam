import { useState } from "react"
import { useDarkMode } from "../Types/useDarkMode"

export const ThemeToggle: React.FC = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [theme, setTheme] = useDarkMode();

    const handleOnClick = () => {
        setIsSelected(!isSelected);
    }


    return (
        <div className="rounded-full cursor-pointer hover:bg-stone-300 w-max group relative p-2" onClick={handleOnClick}>
            <div className={`h-5 w-5 cursor-pointer grid place-content-center ${isSelected ? `bg-blue-500` : `bg-transparent border-2 border-zinc-500`}`}>
                {isSelected && <p className="text-white text-sm" >D</p>}
            </div>
        </div>
    )
}