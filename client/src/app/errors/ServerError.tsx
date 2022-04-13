import { Button, Container,Divider,Paper,Typography} from "@mui/material";
import { useLocation } from "react-router-dom";
import { customHistory } from '../layout/CustomBrowserRouter';

export default function ServerError(){
    // @ts-ignore
    const location = useLocation();
    const state : any = location?.state;
    const errorDetails = state?.error;
    // @ts-ignore
    return(
        <Container component={Paper}>
            {state ? (
                <>
            <Typography variant='h5' color='error' gutterBottom>
                {errorDetails?.title}
            </Typography>
            <Divider />
            <Typography>{errorDetails?.detail || 'Internal server error'}</Typography>
                </>
            ) : (
            <Typography variant='h5' gutterBottom>
                Server error
            </Typography>  
            )}
            <Button onClick={()=> customHistory.push('/catalog')}>Go back to the store</Button>

        </Container>
    )
}