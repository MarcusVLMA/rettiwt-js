import styled from 'styled-components';

export const ProfileCard = styled.div`
    border-radius: 10px;
    background-color: #FFFFFF;
`;

export const Username = styled.div`
    font-weight: bold;
    font-size: 22px;
`;

export const InfoTitle = styled.div`
    font-weight: bold;
    font-size: 14px;
`;

export const InfoValue = styled.div`
    font-size: 18px;
`;

export const ProfilePicture = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 30px;
    border-width: 1px;
    border-color: #000000;
    border-style: solid;
    &:hover {
        cursor: pointer;
    }
`