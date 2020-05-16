import React from 'react';
import styled from 'styled-components';

const _SignUpCard = styled.div`
    width: 40vw;
    height: 70vh;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;
export const SignUpCard = props => {
    const { className, ...rest } = props;
    return <_SignUpCard className={`${className} card`} {...rest}/>;
}

export const SignUpTitle = styled.h1`
    align-self: center;
    font-size: 33px;
    font-family: Roboto;
    font-weight: 800;
`;