import React from 'react';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import Profile from './Profile';
import { MenuButton } from '../../styles/components/Menu';

export default function Menu(props) {
    const logout = async () => {
        await localStorage.removeItem('@rettiwt-js/token');
        props.history.push('/');
    }

    return (
        <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex flex-column justify-content-between">
                <Profile />
                <MenuButton 
                    className="mt-3" 
                    startIcon={<SearchIcon/>}
                    onClick={() => props.history.push('/search/user')}
                >
                    Search User
                </MenuButton>
                <MenuButton 
                    className="mt-2" 
                    startIcon={<HomeIcon/>}
                    onClick={() => props.history.push('/home')}
                >
                    Home
                </MenuButton>
            </div>
            
            <MenuButton startIcon={<LogoutIcon/>} onClick={logout}>
                Logout
            </MenuButton>
        </div>
    );
}