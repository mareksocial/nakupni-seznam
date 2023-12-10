import { Link } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'
import { useTranslation } from 'react-i18next'

const HomePage: React.FC = () => {
    const userContext = useUser()
    const { t } = useTranslation()

    const loginAsOwner = () => {
        userContext?.login({ id: '1', name: 'Marek Machuta (owner)' })
    }

    const loginAsMember = () => {
        userContext?.login({ id: '2', name: 'Marek Machuta (guest)' })
    }
    return (
        <div className='h-screen bg-white dark:bg-black'>
<div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-4xl text-black dark:text-white font-bold mb-4'>{t("heading")} </h1>

            <Link to='/lists' className='bg-blue-600 rounded p-2 text-white mt-4 mb-6'>
            {t("lists_page")}
            </Link>

            <button className='bg-emerald-700 rounded p-2 text-white mt-4' onClick={loginAsOwner}>
            {t("login_owner")}
            </button>
            <button className='bg-stone-600 rounded p-2 text-white mt-4' onClick={loginAsMember}>
            {t("login_member")}
            </button>
        </div>
        </div>
        
    )
}

export default HomePage
