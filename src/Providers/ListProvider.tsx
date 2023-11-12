import React, { PropsWithChildren, createContext, useContext, useState } from 'react'
import { List } from '../Types/List'

const ListsMockData = [
    {
        id: '1',
        name: 'Test List 1',
        users: [
            {
                id: '1',
                name: 'firstUser',
                isOwner: true,
            },
            {
                id: '2',
                name: 'secondUser',
                isOwner: false,
            },
        ],
        items: [
            {
                id: '1',
                name: 'Chleba',
                isCompleted: false,
            },
            {
                id: '2',
                name: 'Rohlíky',
                isCompleted: false,
            },
        ],
    },
    {
        id: '2',
        name: 'Test List 2',
        users: [
            {
                id: '1',
                name: 'firstUser',
                isOwner: true,
            },
            {
                id: '2',
                name: 'secondUser',
                isOwner: false,
            },
        ],
        items: [
            {
                id: '1',
                name: 'Toustový chléb',
                isCompleted: false,
            },
            {
                id: '2',
                name: 'Mandarinky 1kg',
                isCompleted: true,
            },
        ],
    },
]

interface IListsContext {
    lists: List[]
    setLists: React.Dispatch<React.SetStateAction<List[]>>
    getListsByUserId: (userId: string) => List[]
    getListById: (listId: string) => List | undefined
    updateList: (listId: string, updatedData: Partial<List>) => void
}

const ListsContext = createContext<IListsContext>({
    lists: [],
    setLists: () => {},
    getListsByUserId: () => [],
    getListById: () => undefined,
    updateList: () => {},
})

export const useLists = () => useContext(ListsContext)

export const ListProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [lists, setLists] = useState<List[]>(ListsMockData)

    const getListsByUserId = (userId: string) => {
        return lists.filter((list) => list.users.some((user) => user.id === userId))
    }

    const getListById = (listId: string) => {
        return lists.find((list) => list.id === listId)
    }

    const updateList = (listId: string, updatedData: Partial<List>) => {
        setLists((currentLists) => currentLists.map((list) => (list.id === listId ? { ...list, ...updatedData } : list)))
    }

    return (
        <ListsContext.Provider value={{ lists, setLists, getListsByUserId, getListById, updateList }}>
            {children}
        </ListsContext.Provider>
    )
}