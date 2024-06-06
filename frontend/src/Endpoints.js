

const BackendURL = process.env.REACT_APP_BACKEND_URL;

const isLoggedInMiddleware = (response, setLoggedIn) => {
    if(response.status == 401) {
        setLoggedIn(false);
    }
    return response;
}


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

    doGetBooksOwnedBy = (userId) => {
        return fetch(BackendURL+"/book/ownedby/"+userId, {
            "method": "GET"
        });
    }

    doGetBookInfo = (bookId) => {
        return fetch(BackendURL+"/book/get/"+bookId, {
            "method": "GET"
        });
    }

    doDeleteBook = (bookId) => {
        return fetch(BackendURL+"/book/"+bookId,  {
            "method": "DELETE",
            "credentials": "include"
        });
    }

    doGetBookComments = (bookId) => {
        return fetch(BackendURL+"/book/comments/"+bookId, {
            "method": "GET"
        });
    }

    sendBookComment = (bookId, commentText, starRating, setLoggedIn) => {
        const Body = {
            text: commentText,
            starRating: starRating
        };
        return fetch(BackendURL+"/book/comment/"+bookId,  {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body),
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }

    verifyIdentity = () => {
        return fetch(BackendURL+"/auth/check-identity", {
            "method": "GET",
            "credentials": "include"
        });
    }

    doUploadBook = (title, author, genre, setLoggedIn) => {

        const Body = {
            title: title,
            author: author,
            genre: genre
        };

        return fetch(BackendURL+"/book/upload", {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body),
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }

    doCreateForgotPasswordRequest = (email) => {
        const Body = {
            email: email
        };
        return fetch(BackendURL+"/auth/forgotpassword/request", {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body)
        });
    };

    doResetPassword = (code, password) => {
        const Body = {
            password: password
        };
        return fetch(BackendURL+"/auth/forgotpassword/change_password/"+code, {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body)
        });
    };

    doRegister = (email, username, password) => {
        const Body = {
            email: email,
            username: username,
            password: password
        };

        return fetch(BackendURL+"/auth/register", {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body)
        });
    };

    doGetSelf = () => {
        return fetch(BackendURL+"/user/getself", {
            "method": "GET",
            "credentials": "include"
        });
    };

    doGetUser = (userId) => {
        return fetch(BackendURL+"/user/get/"+userId, {
            "method": "GET"
        });
    };

    doGetRecommendations = () => {
        return fetch(BackendURL+"/user/recommendation", {
            "method": "GET",
            "credentials": "include"
        });
    };

    doStartExchange = (bookId, setLoggedIn) => {
        const Body = {
            bookId: bookId
        };

        return fetch(BackendURL+"/bookexchange/createExchange", {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body),
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }

    doAcceptTwoExchange = (exchangeId, bookId) => {
        const Body = {
            bookId: bookId
        };

        return fetch(BackendURL + "/bookexchange/acceptTwo/"+exchangeId, {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body),
            "credentials": "include"
        });

    }

    doAcceptOneExchange = (exchangeId) => {
        return fetch(BackendURL + "/bookexchange/acceptOne/"+exchangeId, {
            "method" : "POST",
            "credentials": "include"
        });
    }

    doConfirmExchange = (exchangeId) => {
        return fetch(BackendURL + "/bookexchange/confirmexchange/"+exchangeId, {
            "method" : "POST",
            "credentials": "include"
        });
    }

    doConfirmRead = (exchangeId) => {
        return fetch(BackendURL + "/bookexchange/confirmread/"+exchangeId, {
            "method" : "POST",
            "credentials": "include"
        });
    }

    doConfirmReexchange = (exchangeId) => {
        return fetch(BackendURL + "/bookexchange/confirmreexchange/"+exchangeId, {
            "method" : "POST",
            "credentials": "include"
        });
    }

    doCancelExchange = (exchangeId) => {
        return fetch(BackendURL + "/bookexchange/cancel/"+exchangeId, {
            "method" : "DELETE",
            "credentials": "include"
        });
    }

    doGetExchangesByUser = () => {
        return fetch(BackendURL+"/bookexchange/getbyuser", {
            "method" : "GET",
            "credentials": "include"
        });
    }

    doUploadImage = (bookId, file, setLoggedIn) => {
        const formData = new FormData();
        formData.append("bookImg", file);

        fetch(BackendURL+"/book/uploadImage/"+bookId, {
            "method" : "POST",
            "body": formData,
            "credentials": "include"
        });
    }

    doSendMessage = (exchangeId, content) => {
        const Body = {
            content: content
        };

        return fetch(BackendURL+ '/message/send/' + exchangeId, {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body),
            "credentials": "include"
        });      
    }

    doGetMessages = (exchangeId)  => {
        return fetch(BackendURL + "/message/" + exchangeId, {
            "method": "GET",
            "credentials": "include"
        });
    }
    
}

export default new EndPoints();