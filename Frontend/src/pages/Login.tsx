import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import CustomInput from '../components/shared/CustomInput'
import {IoIosLogIn} from 'react-icons/io'
import toast, {} from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {

    const auth = useAuth()
    const handleSubmit =  async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        try {
            toast.loading("signing in...", {id: "login"})
            await auth?.login(email, password);
            toast.success("Logged In successfully!", {id: "login"})
        } catch (e) {
            console.log(e)
            toast.error("Log In Failed!", {id:"login"})
        }
    }
  return (
    <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
        <Box padding={8} mt={8} display={{md: "flex", sm: "none", xs: "none"}}>
            <img src='airobot.png' alt='Image of a Robot' style={{width: "400px"}} />
        </Box>
        <Box display={'flex'} flex={{xs: 1, md: 0.5}} justifyContent={"center"} alignItems={"center"} padding={2} ml={"auto"} mt={16}>
            <form onSubmit={handleSubmit} style={{ margin: "auto", padding: "30px", boxShadow: "10px 10px 20px #000", borderRadius: "10px", border: "none"}}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Typography variant='h4' textAlign={'center'} padding={2} fontWeight={600}> Login </Typography>
                    <CustomInput type="email" name="email" label='Email'/>
                    <CustomInput type="password" name="password" label='Password'/>
                    <Button type='submit' sx={{px:2,py:1,mt:2,width:"400px", borderRadius:2, bgcolor:"#00fffc", color: "black" }} endIcon={<IoIosLogIn/>}>Login</Button>
                </Box>
            </form>

        </Box>
    </Box>
  )
}
