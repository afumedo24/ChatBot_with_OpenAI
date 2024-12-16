import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavLinks from './shared/NavLinks';

export default function Header() {

    const auth = useAuth()
  return (
   <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "None"}}>
    <Toolbar sx={{display: "flex"}}>
        <Logo />
        <div> {auth?.isLoggedIn ? (
            <> 
                <NavLinks bg="#00fffc" to="/chat" text='Go To Chat' textColor='black'/>
                <NavLinks bg="#51538f" to="/" text='logout' textColor='white' />
            </>
        ) : (
            <> 
                <NavLinks bg="#00fffc" to="/login" text='Login' textColor='black'/>
                <NavLinks bg="#51538f" to="/signup" text='Signup' textColor='white' />
            </> 
        )}
        </div>

    </Toolbar>
   </AppBar>
  )
}
