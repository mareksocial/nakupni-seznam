import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CreateShoppingListProps {
    isOpen: boolean
    onClose: () => void
    onCreateList: (listName: string) => void
}

const CreateShoppingList: React.FC<CreateShoppingListProps> = ({ isOpen, onClose, onCreateList }) => {
    const [listName, setListName] = useState('')
    const { t } = useTranslation()

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
        <div className='relative top-20 mx-auto p-5 border shadow-lg rounded-md bg-white 
            w-full sm:w-96 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
            <div className='mt-3 text-center'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>{t("create_new_list")}</h3>
                <div className='mt-2 px-7 py-3'>
                    <input
                        type='text'
                        placeholder={t("enter_name")}
                        className='mb-3 px-3 py-2 border rounded w-full'
                        onChange={(e) => setListName(e.target.value)}
                    />
                    <button
                        className='bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-full sm:w-auto'
                        onClick={() => onCreateList(listName)}
                    >
                        {t("create_new_list")}
                    </button>
                </div>
                <div className='items-center px-4 py-3'>
                    <button
                        id='ok-btn'
                        className='px-4 py-2 bg-stone-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-stone-500 focus:outline-none focus:ring-2 focus:ring-gray-300'
                        onClick={onClose}
                    >
                        {t("close_btn")}
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default CreateShoppingList