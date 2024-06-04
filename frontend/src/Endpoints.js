const BackendURL = process.env.REACT_APP_BACKEND_URL;

const isLoggedInMiddleware = (response, setLoggedIn) => {
    if(response.status == 401) {
        setLoggedIn(false);
    }
    return response;
}


class EndPoints
{

    doLogin = (email, password, setLoggedIn) => {

        const Body = {
            "email" : email,
            "password" : password
        }

        console.log(BackendURL + "/auth/login");
        console.log("The backend url was printed");

        return fetch(BackendURL + "/auth/login", {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body),
            "credentials": "include"

        });
       
    

    };

    doLogout = () => {
        return fetch(BackendURL + "/auth/logout", {
            "method": "POST",
            "credentials": "include"
        });
    }

    doGetBooks = ()  => {
        return fetch(BackendURL + "/book/all", {
            "method": "GET"
        });
    }


}

export default new EndPoints();