import { Link } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'

const HomePage: React.FC = () => {
    const userContext = useUser()

    const loginAsOwner = () => {
        userContext?.login({ id: '1', name: 'Marek Machuta (owner)' })
    }

    const loginAsMember = () => {
        userContext?.login({ id: '2', name: 'Marek Machuta (guest)' })
    }
    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-4xl font-bold mb-4'>Shopping Lists </h1>

            <Link to='/lists' className='bg-blue-600 rounded p-2 text-white mt-4 mb-6'>
                My shopping lists
            </Link>

            <button className='bg-emerald-700 rounded p-2 text-white mt-4' onClick={loginAsOwner}>
                Login - Owner
            </button>
            <button className='bg-stone-600 rounded p-2 text-white mt-4' onClick={loginAsMember}>
                Login - Member
            </button>
        </div>
    )
}

export default HomePage
