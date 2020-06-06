import React, { useState, useEffect } from 'react';

import { useSnackbar } from 'notistack';

import Menu from '../components/Menu';
import Tweet from '../components/Tweet';
import TweetInput from '../components/TweetInput';

import { Background } from '../styles/General';
import { FeedCard } from '../styles/screens/Home';
import backendApi from '../backendApi';

export default function Home(props) {
    const [ tweets, setTweets ] = useState([]);
    const [ newTweet, setNewTweet ] = useState();
    
    const { enqueueSnackbar } = useSnackbar();

    const getTweets = async () => {
        const response = await backendApi.get('/tweets');
        setTweets(response.data);
    }

    const sendNewTweet = async () => {
        if(newTweet) {
            const response = await backendApi.post('/tweets', {
                text: newTweet
            });

            if(!response.ok) {
                getTweets();
                setNewTweet('');
            } else {
                enqueueSnackbar("Sorry, that didn't work. Please, try again later", {variant:'error'});
            }
        } else {
            enqueueSnackbar('Write something before clicking on Send!', {variant:'error'});
        }
    }

    useEffect(() => {
        getTweets();
    }, []);

    return (
        <Background className="d-flex justify-content-center">
            <FeedCard className="mr-4">
                <TweetInput 
                    text={newTweet} 
                    onChange={setNewTweet}
                    onSend={sendNewTweet} 
                />
                {
                    tweets.map((tweet) => {
                        return <Tweet tweet={tweet}/>
                    })
                }
            </FeedCard>
            <Menu history={props.history}/>
        </Background>
    )
}