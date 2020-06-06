import React from 'react';
import styled from 'styled-components';
import { InputBase } from '@material-ui/core';


export const Container = styled.div`
    min-width: 30vw; 
`;

export const ListUserCard = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    border-radius: 10px;
    background-color: #FFFFFF;
`;

export const SearchInput = styled(InputBase)`
    && {
        background-color: #FFFFFF;
        border-radius: 9px;
    }
`;