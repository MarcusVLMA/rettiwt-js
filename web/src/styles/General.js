import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const Background = styled.div`
    background: linear-gradient(45deg, #FFFFFF, #6DD5FA, #2980B9);
    width: 100vw;
    height: 100vh; 
`;

export const GreenButton = styled(Button)`
    && {
        font-weight: bold;
        color: #FFFFFF;
        background-color: #32CD32;
    }
`;