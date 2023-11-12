import { useState } from 'react'
import CreateShoppingList from '../Components/Modals/CreateShoppingList'
import { useLists } from '../Providers/ListProvider'
import { Link } from 'react-router-dom'
import DeleteShoppingList from '../Components/Modals/DeleteShoppingList'
import { useUser } from '../Providers/UserProvider'

const Lists: React.FC = () => {
    const listProvider = useLists()
    const user = useUser()

    const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)
    const [isDeleteShoppingListId, setIsDeleteShoppingListId] = useState('')

    if (!user || !user.user || !user.user.id) return <div>To view lists you must be signed in</div>

    let listData = listProvider.getListsByUserId(user.user.id)

    const onCreateList = (listName: string) => {
        listProvider.setLists([
            ...listProvider.lists,
            {
                id: (listProvider.lists.length + 1).toString(),
                name: listName,
                items: [],
                users: [
                    {
                        id: user!.user!.id,
                        name: user!.user!.name,
                        isOwner: true,
                    },
                ],
            },
        ])

        setIsCreateListModalOpen(false)
        listData = listProvider.getListsByUserId(user!.user!.id)
    }

    const onDeleteList = (listId: string) => {
        listProvider.setLists(listProvider.lists.filter((list) => list.id !== listId))
        setIsDeleteShoppingListId('')
    }

    return (
        <div>
            <CreateShoppingList
                isOpen={isCreateListModalOpen}
                onClose={() => setIsCreateListModalOpen(false)}
                onCreateList={onCreateList}
            />

            <DeleteShoppingList
                listId={isDeleteShoppingListId}
                isOpen={isDeleteShoppingListId !== ''}
                onClose={() => setIsDeleteShoppingListId('')}
                onDelete={onDeleteList}
            />

            <h1 className='text-2xl font-bold text-gray-800 mb-4 mt-4 text-center'>My shopping lists</h1>
            <div className='flex flex-col items-center'>
                <div className='flex justify-end mb-4'>
                    <button
                        className='bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'
                        onClick={() => setIsCreateListModalOpen(true)}
                    >
                        Create New List
                    </button>
                </div>

                {listData.map((list) => (
                    <div key={list.id} className='bg-gray-100 p-3 rounded-md mb-2 w-full md:w-1/2 flex'>
                        <Link className='' key={list.id} to={`/listDetail/${list.id}`}>
                            <div key={list.id}>
                                <div className='flex items-center justify-between'>
                                    <span className='text-gray-700'>{list.name}</span>
                                </div>
                            </div>
                        </Link>

                        {list.users.find((listUser) => listUser.id === user!.user!.id)?.isOwner && (
                            <button
                                className='ml-auto bg-red-600 px-3 rounded-full text-white hover:bg-red-400 transition duration-300 ease-in-out'
                                onClick={() => setIsDeleteShoppingListId(list.id)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Lists