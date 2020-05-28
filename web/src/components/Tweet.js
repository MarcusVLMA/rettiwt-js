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
    const timeAgo = (now - tweetDate.getTime())/3600000; // (milliseconds)/3600000 = hours

    return (
        <Container className="p-2">
            <div className="d-flex align-items-center">
                <Username>{username}</Username>
                <HoursAgo className="ml-2">{`${Math.round(timeAgo)}h`}</HoursAgo>
            </div>
            <Text className="mt-1">{text}</Text>
        </Container>
    )
}