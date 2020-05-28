import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Container = styled.div`
    border-bottom: 1px solid #C2C2C2;
`;

export const SendButton = styled(Button)`
    && {
        font-weight: bold;
        color: #FFFFFF;
        background-color: #2980B9;
        border-radius: 15px;
    }
`;