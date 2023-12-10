import { Link } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'
import { useTranslation } from "react-i18next";
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';

const Layout: React.FC = () => {
    const userContext = useUser()

    const { t } = useTranslation();

    return (
<nav className='bg-stone-900 text-white p-4'>
    <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='flex flex-col md:flex-row items-center text-center md:text-left'>
            <Link to='/' className='text-white px-3 py-2 rounded-md text-sm font-medium mb-2 md:mb-0'>
                {t('main_page')}
            </Link>
            <ThemeToggle />
        </div>

        <div className='flex flex-col md:flex-row items-center text-center md:text-right mt-2 md:mt-0'>
            <LangSwitch />
            <span className='mt-2 md:mt-0 md:ml-2'>
                {userContext?.user ? userContext.user.name : t("no_user")}
            </span>
        </div>
    </div>
</nav>


    )
}

export default Layout
