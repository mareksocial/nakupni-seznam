import React, { useState } from 'react'
import { User } from '../../Types/User'
import { useTranslation } from 'react-i18next'

interface ListUsersModalProps {
    isOpen: boolean
    onClose: () => void
    users: User[]
    onAddUser: (userName: string) => void
    onRemoveUser: (userId: string) => void
}

const ListUsersModal: React.FC<ListUsersModalProps> = ({ isOpen, onClose, users, onAddUser, onRemoveUser }) => {
    const [userName, setUserName] = useState('')
    const { t } = useTranslation()

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full' id='my-modal'>
            <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                <div className='mt-3 text-center'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900'>{t("users")}</h3>
                    <div className='mt-2 px-7 py-3'>
                        <input
                            type='text'
                            placeholder={t("enter_username")}
                            className='mb-3 px-3 py-2 border rounded'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button
                            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                            onClick={() => {
                                onAddUser(userName)
                                setUserName('')
                            }}
                        >
                            {t("add_user")}
                        </button>
                    </div>
                    <div className='mt-4'>
                        <ul>
                            {users.map((user) => (
                                <li key={user.id} className='flex justify-between items-center py-2'>
                                    <span>{user.name}</span>
                                    {!user.isOwner && (
                                        <button
                                            className='bg-red-500 rounded-full hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs'
                                            onClick={() => onRemoveUser(user.id)}
                                        >
                                            {t("remove")}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='items-center px-4 py-3'>
                        <button
                            id='ok-btn'
                            className='px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
                            onClick={onClose}
                        >
                            {t("submit_btn")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUsersModal
