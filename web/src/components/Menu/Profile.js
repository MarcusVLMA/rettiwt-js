import React, { useState, useRef, useEffect } from 'react';
import {
    ProfileCard,
    Username,
    InfoTitle,
    InfoValue,
    ProfilePicture
} from '../../styles/components/Menu/Profile'

import backendApi from '../../backendApi';


export default function Profile() {
    const [ user, setUser ] = useState({});
    const inputFile = useRef(null) 

    useEffect(() => {
        const getUser = async () => {
            const response = await backendApi.get('/users');
            setUser(response.data);
        }
        getUser();
    }, []);

    const onUpdatePicture = async (event) => {
        const form = new FormData()
        form.append('file', event.target.files[0])

        const response = await backendApi.put('/users/picture', form)
        if (response.ok && response.data.wasUserUpdated) {
            const _user = {...user}
            _user.profile_picture = response.data.url
            setUser(_user)
        }
    }

    return (
        <ProfileCard className="d-flex flex-column align-items-center justify-content-center p-3">
            <ProfilePicture alt="change profile picture" onClick={() => inputFile.current.click()} src={user.profile_picture || "https://comerciolocalcantanhede.pt/ourivesarialouro/images/Avatar.png"}  />
            <input type="file" accept="image/*" ref={inputFile} style={{ display: 'none' }} onInput={onUpdatePicture} />
            <Username>{user.username}</Username>
            <div className="d-flex w-100 justify-content-between mt-3">
                <div className="d-flex flex-column align-items-center mr-4">
                    <InfoTitle>Followers</InfoTitle>
                    <InfoValue>{user.followed ? user.followed.length : null}</InfoValue>
                </div>
                <div className="d-flex flex-column align-items-center mr-4">
                    <InfoTitle>Following</InfoTitle>
                    <InfoValue>{user.following ? user.following.length : null}</InfoValue>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <InfoTitle>Tweets</InfoTitle>
                    <InfoValue>{user.tweets ? user.tweets.length : null}</InfoValue>
                </div>
            </div>
        </ProfileCard>
    )
}