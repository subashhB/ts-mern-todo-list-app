import React from 'react';
import { User } from '../models/user';
import { Button, Navbar } from 'react-bootstrap';
import * as TaskApi from '../networks/task_api';

interface NavbarLoggedInViewProps{
    user: User,
    onLogoutSuccessful: () => void,
}

const NavbarLoggedInView = ({ user, onLogoutSuccessful }: NavbarLoggedInViewProps) => {

    async function logout(){
        try{
            await TaskApi.logout();
            onLogoutSuccessful();
        }catch(error){
            console.error(error);
            alert(error);
        }
    }

  return (
    <>
        <Navbar.Text className='me-2'>
            Signed in as: { user.username }
        </Navbar.Text>
        <Button onClick={ logout }>Logout</Button>
    </>
  )
}

export default NavbarLoggedInView;