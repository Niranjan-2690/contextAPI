import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import CartContextProvider from './context/appcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CartContextProvider>
            <App /> 
        </CartContextProvider>     
    </React.StrictMode>
)
