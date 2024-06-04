import { Link, useNavigate } from "react-router-dom";
import Endpoints from "../Endpoints";
import Button from '@mui/material/Button';



export function Navbar(props)
{

    const navigate = useNavigate();

    const logOut = () => {
        Endpoints.doLogout().then(() => {
            props.setLoggedIn(false);
            navigate("/Login")
        });
    };


    return (

        <>
        <div style={{ marginTop: '5px' }}>
            {!props.loggedIn ? (<Link to="/Login"> 
                <Button variant="contained"> 
                    Log In
                </Button>
            </Link>)
            :
            (
                <>
                    <Link to="/"> 
                        <Button variant="contained">
                                Home
                        </Button> 
                    </Link>
                    <Button variant="contained" onClick={logOut}>
                        Log Out
                    </Button>
                </>
            )
            }
            <Link to="/Catalog">
                <Button variant="contained"> 
                    Catalog Page 
                </Button>
            </Link>
            {!props.loggedIn ? (
                <Link to="/CreateAccount">
                    <Button variant="contained"> 
                        Create Account Page 
                    </Button>
                </Link>
            ) : (
                <>
                    <Link to="/DirectMessage">
                        <Button variant="contained"> 
                            DM Page
                        </Button>
                    </Link>
                    <Link to="/BookListing">
                        <Button variant="contained"> 
                            Book Listing Page 
                        </Button>
                    </Link>
                </>
            )}
        </div>
    </>

    )
}