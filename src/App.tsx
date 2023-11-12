import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListDetail from './Routes/ListDetail'
import Layout from './Components/Layout'
import { UserProvider } from './Providers/UserProvider'
import MainPage from './Routes/MainPage'
import Lists from './Routes/Lists'
import { ListProvider } from './Providers/ListProvider'  

function App() {
    return (
        <UserProvider>
            <ListProvider>
                <BrowserRouter>
                    <Layout />
                    <div>
                        <Routes>
                            <Route path='/' Component={MainPage} />
                            <Route path='/listDetail/:id' Component={ListDetail} />
                            <Route path='/lists' Component={Lists} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </ListProvider>
        </UserProvider>
    )
}

export default App
