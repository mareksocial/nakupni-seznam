import { useRef, useState } from 'react'
import { useUser } from '../Providers/UserProvider'
import ListUsersModal from './Modals/ListUsersModal'
import { User } from '../Types/User'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'

interface ListHeaderProps {
    listName: string
    listUsers: User[]
    currentFilter: 'all' | 'completed' | 'uncompleted'
    setFilter: (filter: 'all' | 'completed' | 'uncompleted') => void
    onListNameChange: (listName: string) => void
    onAddItem: (itemName: string) => void
    onAddUser: (userName: string) => void
    onRemoveUser: (userId: string) => void
}

const ListHeader: React.FC<ListHeaderProps> = ({
    currentFilter,
    listName,
    listUsers,
    onAddUser,
    onAddItem,
    setFilter,
    onRemoveUser,
    onListNameChange,
}) => {
    const userContext = useUser()
    const ref = useRef<HTMLInputElement>(null)
    const addItemInputRef = useRef<HTMLInputElement>(null)
    const isUserOwner = listUsers.find((user) => user.id === userContext?.user?.id)?.isOwner || false
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { t } = useTranslation()

    return (
        <div>
            <div className='flex mb-4 w-full items-center'>
                {isUserOwner && (
                    <button
                        onClick={() => {
                            ref?.current?.focus()
                        }}
                    >
                        <EditIcon className='mr-2' />
                    </button>
                )}
                <input
                    className='text-xl bg-zinc-200 font-bold text-gray-800 w-full'
                    defaultValue={listName}
                    disabled={!isUserOwner}
                    ref={ref}
                    onBlur={(e) => onListNameChange(e.currentTarget.value)}
                />
                <div className='flex w-full justify-items-end'>
                    {isUserOwner && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='ml-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            {t('manage_users')}
                        </button>
                    )}

                    {!isUserOwner && (
                        <button
                            onClick={() => onRemoveUser(userContext?.user?.id || '')}
                            className='ml-auto bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            {t('leave')}
                        </button>
                    )}

                    <ListUsersModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAddUser={onAddUser}
                        onRemoveUser={onRemoveUser}
                        users={listUsers}
                    />
                </div>
            </div>
            <div className='mb-4'>
                <button
                    className={`px-4 ${currentFilter === 'all' ? 'bg-blue-600 rounded-md text-white' : 'bg-stone-300'} rounded-md py-1 mr-2`}
                    onClick={() => setFilter('all')}
                >
                    {t('all_items')}
                </button>
                <button
                    className={`px-4 ${currentFilter === 'completed' ? 'bg-blue-600 rounded-md text-white' : 'bg-stone-300'} rounded-md py-1 mr-2`}
                    onClick={() => setFilter('completed')}
                >
                    {t('solved_items')}
                </button>
                <button
                    className={`px-4 ${currentFilter === 'uncompleted' ? 'bg-blue-600 rounded-md text-white' : 'bg-stone-300'} rounded-md py-1 mr-2`}
                    onClick={() => setFilter('uncompleted')}
                >
                    {t('unsolved_items')}
                </button>
            </div>

            <div className='my-4'>
                <input type='text' placeholder={t("add_new_item")} className='border p-2 mr-2' ref={addItemInputRef} />
                <button
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => {
                        onAddItem(addItemInputRef.current?.value || '')
                        addItemInputRef.current!.value = ''
                    }}
                >
                    {t("add_item")}
                </button>
            </div>
        </div>
    )
}

export default ListHeader
