const BackendURL = process.env.REACT_APP_BACKEND_URL;


class EndPoints
{
    doLogin = (email, password) => {

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
            //"credentials": "include"

        })
       
    

    };




}

export default new EndPoints();