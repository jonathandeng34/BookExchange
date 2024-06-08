import './styles/random.css'
export const Login = () => {
    return (
    <>
    <head>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Login Page</title>
    </head>
    <body>
        <div class="login">
            <h1>Bruin Book Exchange</h1>
            <h2>Login</h2>
            <form action="/login" method="POST">
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required></input>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </body>
    </>
    )
    }