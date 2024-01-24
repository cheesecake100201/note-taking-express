import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

const Header = () => {
    const { isAuthenticated,  logout } = useContext(AuthContext);
    if(!isAuthenticated) {
        return null;
    }
  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <a href='/'><h1 className="text-white text-xl font-bold">Notes App</h1></a>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 rounded"
      >
        Logout
      </button>
    </header>
  )
}

export default Header