import React from 'react';
import { InputBase } from '@material-ui/core';
import { 
    Container,
    SendButton 
} from '../styles/components/TweetInput';

export default function TweetInput(props) {
    return (
        <Container className="w-100 d-flex flex-column pb-3">
            <InputBase
                multiline
                className="w-100 pl-3 pt-3 pr-3 pb-2"
                placeholder="What are you thinking about?"
                inputProps={{ 'aria-label': 'naked' }}
                value={props.text}
                onChange={(event) => props.onChange(event.target.value)}
            />
            <SendButton className="align-self-end mr-3" onClick={props.onSend} variant="contained" disableElevation>
                Send
            </SendButton>
        </Container>
    )
}