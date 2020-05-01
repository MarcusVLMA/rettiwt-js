import styled from 'styled-components';

export const Background = styled.div`
    background: linear-gradient(45deg, #FFFFFF, #6DD5FA, #2980B9);
    width: 100vw;
    height: 100vh; 
`;

export const LoginCard = styled.div`
    width: 60vw;
    height: 70vh;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    grid-template-rows: 1fr;

`;

export const LoginCardLeft = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    
    div a {
        font-weight: bolder;
        color: black;
        font-size: 12px;
    }

    &::after {
        content: '';
        border-right: 1px solid #E2E2E2;
        position: absolute;
        top: 17%;
        bottom: 17%;
        right: 57%;
    } 
`; 

export const LoginImage = styled.img`
    width: 70%;
`; 

export const LoginCardRight = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;

    h1 {
        font-size: 33px;
        font-family: Roboto;
        font-weight: 800;
    }

    .fieldsButton {
        font-weight: bold;
        color: #FFFFFF;
        background-color: #32CD32;
    }
`;