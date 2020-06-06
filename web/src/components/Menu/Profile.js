import React, { useState, useEffect } from 'react';
import {
    ProfileCard,
    Username,
    InfoTitle,
    InfoValue
} from '../../styles/components/Menu/Profile'

import backendApi from '../../backendApi';


export default function Profile() {
    const [ user, setUser ] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const response = await backendApi.get('/users');
            setUser(response.data);
        }
        getUser();
    }, []);

    return (
        <ProfileCard className="d-flex flex-column align-items-center justify-content-center p-3">
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