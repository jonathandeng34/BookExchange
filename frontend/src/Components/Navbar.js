import { Link } from "react-router-dom"

export function Navbar()
{
    return (

        <>
            <Link to="/"> 
                <button> Home </button> 
            </Link>
            <Link to="/Login"> 
                <button> Log In </button> 
            </Link>
            <Link to="/BookInformation">
                <button> Book Information Page </button>
            </Link>
            <Link to="/Catalog">
                <button> Catalog Page </button>
            </Link>
            <Link to="/CreateAccount">
                <button> Create Account Page </button>
            </Link>
            <Link to="/ResetPassword">
                <button> Reset Password Page </button>
            </Link>
            <Link to="/DirectMessage">
                <button> DM Page </button>
            </Link>
            <Link to="/Verification">
                <button> Verification Page </button>
            </Link>
            <Link to="/BookListing">
                <button> Book Listing Page </button>
            </Link>
        </>

    )
}