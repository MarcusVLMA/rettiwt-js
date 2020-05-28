import React from 'react';
import {
    Container,
    Username,
    Text,
    HoursAgo
} from '../styles/components/Tweet';

export default function Tweet({ tweet }) {
    const username = tweet.author.username;
    const text = tweet.text;
    const tweetDate = new Date(tweet.date);
    const now = Date.now();

    const setTimeAgo = () => {
        var timeAgo = Math.round((now - tweetDate.getTime())/3600000); // (milliseconds)/3600000 = hours

        if(timeAgo !== 0) {
            return `${timeAgo}h`;
        } else {
            timeAgo = Math.round((now - tweetDate.getTime())/60000); // (milliseconds)/60000 = minutes
            return `${timeAgo}m`
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