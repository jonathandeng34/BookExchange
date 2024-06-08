

const BackendURL = process.env.REACT_APP_BACKEND_URL;

const isLoggedInMiddleware = (response, setLoggedIn) => {
    if(!document.cookie.includes("jwt")) {
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

    doGetSelf = (setLoggedIn) => {
        return fetch(BackendURL+"/user/getself", {
            "method": "GET",
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    };

    doGetUser = (userId) => {
        return fetch(BackendURL+"/user/get/"+userId, {
            "method": "GET"
        });
    };

    doGetRecommendations = (setLoggedIn) => {
        return fetch(BackendURL+"/user/recommendation", {
            "method": "GET",
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
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

    doAcceptTwoExchange = (exchangeId, bookId, setLoggedIn) => {
        const Body = {
            bookId: bookId
        };

        return fetch(BackendURL + "/bookexchange/acceptTwo/"+exchangeId, {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body),
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));

    }

    doAcceptOneExchange = (exchangeId, setLoggedIn) => {
        return fetch(BackendURL + "/bookexchange/acceptOne/"+exchangeId, {
            "method" : "POST",
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }

    doConfirmExchange = (exchangeId, setLoggedIn) => {
        return fetch(BackendURL + "/bookexchange/confirmexchange/"+exchangeId, {
            "method" : "POST",
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }

    doConfirmRead = (exchangeId, setLoggedIn) => {
        return fetch(BackendURL + "/bookexchange/confirmread/"+exchangeId, {
            "method" : "POST",
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }

    doConfirmReexchange = (exchangeId, setLoggedIn) => {
        return fetch(BackendURL + "/bookexchange/confirmreexchange/"+exchangeId, {
            "method" : "POST",
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }

    doCancelExchange = (exchangeId, setLoggedIn) => {
        return fetch(BackendURL + "/bookexchange/cancel/"+exchangeId, {
            "method" : "DELETE",
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
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
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }

    doSendMessage = (exchangeId, content, setLoggedIn) => {
        const Body = {
            content: content
        };

        console.log("this is the exchange id: " + exchangeId);
        return fetch(BackendURL+ '/message/send/' + exchangeId, {
            "headers":  {"Content-Type" : "application/json"},
            "method" : "POST",
            "body": JSON.stringify(Body),
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));      
    }

    doGetMessages = (exchangeId, setLoggedIn)  => {
        return fetch(BackendURL + "/message/" + exchangeId, {
            "method": "GET",
            "credentials": "include"
        }).then((response) => isLoggedInMiddleware(response, setLoggedIn));
    }
    
}

const instance = new EndPoints();

export default instance;