import { Link } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'

const Layout: React.FC = () => {
    const userContext = useUser()

    return (
        <nav className='bg-stone-900 text-white p-4 flex justify-between'>
            <div>
                <Link to='/' className='text-white px-3 py-2 rounded-md text-sm font-medium'>
                    Main Page
                </Link>
            </div>
            <div>{userContext?.user ? <span>{userContext.user.name}</span> : <span>No User</span>}</div>
        </nav>
    )
}

export default Layout
