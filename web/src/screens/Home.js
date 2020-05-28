import React, { useState, useEffect } from 'react';
import Tweet from '../components/Tweet';
import { Background } from '../styles/General';
import { 
    HomeCard 
} from '../styles/screens/Home';
import backendApi from '../backendApi';

export default function Home(props) {
    const [ tweets, setTweets ] = useState([]);

    useEffect(() => {
        const getTweets = async () => {
            const response = await backendApi.get('/tweets');
            console.log(response.data);
            setTweets(response.data);
        }
        getTweets();
    }, []);

    return (
        <Background className="d-flex justify-content-center">
            <HomeCard>
            {
                tweets.map((tweet) => {
                    return <Tweet tweet={tweet}/>
                })
            }
            </HomeCard>
        </Background>
    )
}