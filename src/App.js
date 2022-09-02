import ButtonCounter from './components/ButtonCounter';
import Navbar from "./components/Navbar";
import Racers from './components/Racers';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import AlertMessage from './components/AlertMessage';
import { useState } from 'react';
import Login from './components/Login';
import CreatePost from './components/CreatePost'

function App(props) {
    const now = new Date();
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration')) > now) ? true : false)

    const flashMessage = (message, category) => {
        setMessage(message);
        setCategory(category)
    }

    const login = () => {
        setLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        setLoggedIn(false)
    }

    return (
        <>
            <Navbar name='Brian' city='Chicago' logout={logout} />
            <div className='container'>
                {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
                { loggedIn ? <h1>You are logged in </h1> : <h1>You are logged out</h1>}
                <Routes>
                    <Route path='/' element={<ButtonCounter />} />
                    <Route path='/standings' element={<Racers />} />
                    <Route path='/register' element={<Register flashMessage={flashMessage}/>} />
                    <Route path='/createpost' element={<CreatePost/>} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} login={login} />} />
                </Routes>
            </div>
        </>
    )
}

export default App;