import React from 'react';
import {
    Container,
    Username,
    Text,
    HoursAgo
} from '../styles/components/Tweet';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const MINUTES_IN_MONTH = 43200;
const MINUTES_IN_YEAR = 518400;

export default function Tweet({ tweet }) {
    const username = tweet.author.username;
    const text = tweet.text;
    const tweetDate = new Date(tweet.date);
    const now = Date.now();

    const setTimeAgo = () => {
        let timeInMinutes = Math.round((now - tweetDate.getTime())/60000); // (milliseconds)/60000 = minutes
        
        if(timeInMinutes < MINUTES_IN_HOUR) {
            return `${Math.floor(timeInMinutes)} minutes`; 
        } else if (timeInMinutes >= MINUTES_IN_HOUR && timeInMinutes < MINUTES_IN_DAY) {
            return `${(timeInMinutes/MINUTES_IN_HOUR).toFixed(2)} hours`;
        } else if(timeInMinutes >= MINUTES_IN_DAY && timeInMinutes < MINUTES_IN_MONTH) {
            return `${Math.floor(timeInMinutes/MINUTES_IN_DAY)} days`;
        } else if(timeInMinutes >= MINUTES_IN_MONTH && timeInMinutes < MINUTES_IN_YEAR) {
            return `${Math.floor(timeInMinutes/MINUTES_IN_MONTH)} months`;
        } else if(timeInMinutes >= MINUTES_IN_YEAR) {
            return `${Math.floor(timeInMinutes/MINUTES_IN_YEAR)} years`;
        }
    }

    const timeAgo = setTimeAgo();

    return (
        <Container className="pt-2 pb-2 pl-3 pr-3">
            <div className="d-flex align-items-center">
                <Username>{username}</Username>
                <HoursAgo className="ml-2">{timeAgo}</HoursAgo>
            </div>
            <Text className="mt-1">{text}</Text>
        </Container>
    )
}