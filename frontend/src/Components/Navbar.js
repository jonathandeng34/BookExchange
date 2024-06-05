import { Link, useNavigate } from "react-router-dom";
import Endpoints from "../Endpoints";
import Button from '@mui/material/Button';

export function Navbar(props) {
    const navigate = useNavigate();

    const logOut = () => {
        Endpoints.doLogout().then(() => {
            props.setLoggedIn(false);
            navigate("/Login")
        });
    };

    const buttonStyle = {
        backgroundColor: '#4D869C',
        color: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 'bold',
        margin: '0 10px',
        fontFamily: 'Inter, sans-serif' // Set font-family
    };

    return (
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!props.loggedIn ? (
                <Link to="/Login" style={{ textDecoration: 'none', margin: '0 10px' }}>
                    <Button variant="contained" style={buttonStyle}>
                        Log In
                    </Button>
                </Link>
            ) : (
                <>
                    <Link to="/Home" style={{ textDecoration: 'none', margin: '0 10px' }}>
                        <Button variant="contained" style={buttonStyle}>
                            Home
                        </Button>
                    </Link>
                    <Button variant="contained" onClick={logOut} style={{ ...buttonStyle, backgroundColor: '#FF6F61' }}>
                        Log Out
                    </Button>
                </>
            )}
            <Link to="/Catalog" style={{ textDecoration: 'none', margin: '0 10px' }}>
                <Button variant="contained" style={buttonStyle}>
                    Catalog Page
                </Button>
            </Link>
            {!props.loggedIn ? (
                <Link to="/CreateAccount" style={{ textDecoration: 'none', margin: '0 10px' }}>
                    <Button variant="contained" style={buttonStyle}>
                        Create Account
                    </Button>
                </Link>
            ) : (
                <>
                    <Link to="/DirectMessage" style={{ textDecoration: 'none', margin: '0 10px' }}>
                        <Button variant="contained" style={buttonStyle}>
                            DM Page
                        </Button>
                    </Link>
                    <Link to="/BookListing" style={{ textDecoration: 'none', margin: '0 10px' }}>
                        <Button variant="contained" style={buttonStyle}>
                            Book Listing
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
}
