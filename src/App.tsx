import { Route, Routes } from 'react-router'
import Auth from './routes/Auth'
import { SignupForm } from './components/signup-form'
import { LoginForm } from './components/login-form'
import Layout from './components/Layout'

import './App.css'
import { createContext, useEffect, useState } from 'react'
import { onCheckProfile } from './services/auth'
import ListingPage from './routes/ListingPage'
import ProductAdd from './routes/ProductAdd'
import MyProducts from './routes/MyProducts'

export type User = {
  username: string;
  email: string;
}

export type contextType = null | [
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
];

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<contextType>(null);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    
    const token = localStorage.getItem("token");
    if (user) {
      return
    }
    if (!token) {
      return
    }
    onCheckProfile().then((data) => {
      if (data.success) {
        setUser(data.user);
      }
    }).catch((error) => {
      console.error("Error checking profile:", error);
    });
    
  },[])

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Routes>
        {!user && (
        <>
          <Route path='/register' element={<Auth bgImageUrl="bg-[url('@/assets/register-bg.jpg')]" children={<SignupForm />} />} />
          <Route path='/login' element={<Auth bgImageUrl="bg-[url('@/assets/login-bg.jpg')]" children={<LoginForm />} />} />

        </>
      )}

        <Route path='/' element={<Layout />}>
          <Route path='/' element={<div>Welcome to our page</div>} />

          <Route path='/listing' element={<ListingPage />} />
          {user?.username && 
          <>
            
                <Route path='/product/create' element={<ProductAdd />} />
                <Route path='/myproducts' element={<MyProducts />} />
            
          </>    
              }

        </Route>


        <Route path='/*' element={<div>404 Not Found</div>} />

      </Routes>
    </UserContext.Provider>
  )
}

export default App
