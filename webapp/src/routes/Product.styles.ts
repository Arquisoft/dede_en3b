import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";

export const StyledButton = styled(Button)`
background: #9681f2;

color: black;

:hover {
    background: #81c9f2;
}
`;

export const StyledImg = styled('img')({
    margin: 20,
    marginLeft: 90,
    display: 'inline-block',
    height: '500px',
    borderRadius: 25
});

export const StyledOuterGrid = styled(Grid)({
    margin: '1em',
    borderRadius: 25,
    alignItems: "center", 
    justifyContent: "center",
    resizeMode: 'cover'
});