import React from 'react';
import Button from '@material-ui/core/Button';
import FollowIcon from '@material-ui/icons/PersonAdd';
import UnfollowIcon from '@material-ui/icons/PersonAddDisabled';
import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 9px 15px 9px 15px;
    border-bottom: 1px solid #C2C2C2;
`;

export const Username = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

export const Stats = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StatsTitle = styled.div`
    font-size: 13px;
    font-weight: bold;
`;

export const StatsValue = styled.div`
    font-size: 15px;
    font-weight: normal;
`;

const StyledFollowButton = styled(Button)`
    && {
        background-color: #2980B9;
        color: #FFFFFF;
        font-size: 9px;
    }
`;
export const FollowButton = props => (
    <StyledFollowButton 
        {...props}
        startIcon={<FollowIcon/>}
    />
)

const StyledUnfollowButton = styled(Button)`
    && {
        background-color: #C2C2C2;
        color: #000000;
        font-size: 9px;
    }
`;
export const UnfollowButton = props => (
    <StyledUnfollowButton 
        {...props}
        startIcon={<UnfollowIcon/>}
    />
)