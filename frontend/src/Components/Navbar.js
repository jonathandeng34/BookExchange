import { Link } from "react-router-dom";
import Endpoints from "../Endpoints";
import Button from '@mui/material/Button';



export function Navbar(props)
{

    const logOut = () => {
        Endpoints.doLogout().then(() => {
            props.setLoggedIn(false);
        });
    };


    return (

        <>
        <div style={{ marginTop: '5px' }}>
            <Link to="/"> 
                <Button variant="contained">
                      Home
                </Button> 
            </Link>
            {!props.loggedIn ? (<Link to="/Login"> 
                <Button variant="contained"> 
                    Log In
                </Button>
            </Link>)
            :
            (
                <Button variant="contained" onClick={logOut}>
                    Log Out
                </Button>
            )
            }
            <Link to="/BookInformation">
                <Button variant="contained"> 
                    Book Information Page
                 </Button>
            </Link>
            <Link to="/Catalog">
                <Button variant="contained"> 
                    Catalog Page 
                </Button>
            </Link>
            <Link to="/CreateAccount">
                <Button variant="contained"> 
                    Create Account Page 
                </Button>
            </Link>
            <Link to="/ResetPassword">
                <Button variant="contained"> 
                    Reset Password Page 
                </Button>
            </Link>
            <Link to="/DirectMessage">
                <Button variant="contained"> 
                    DM Page
                </Button>
            </Link>
            <Link to="/Verification">
                <Button variant="contained"> 
                    Verification Page 
                </Button>
            </Link>
            <Link to="/BookListing">
                <Button variant="contained"> 
                    Book Listing Page 
                </Button>
            </Link>
        </div>
    </>

    )
}