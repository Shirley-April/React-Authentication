import React from  "react"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import Userfront from "@userfront/react"


Userfront.init("demo1234")

const SignUpForm = Userfront.build({
  toolId: "nkmbbm",
});

const LoginForm = Userfront.build({
  toolId: "alnkkd",
})

const PasswordResetForm = Userfront.build({
  toolId: "dkbmmo",
})



export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/reset">Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

          </ul>
        </nav>

      <Switch>
         <Route path="/login">
           <Login/>
         </Route>
         <Route path="/reset">
           <PasswordReset/>
         </Route>
         <Route path="/dashboard">
           <Dashboard/>
         </Route>
         <Route path="/">
           <Home/>
         </Route>
      </Switch>
      </div>
    </Router>
  )
}

function Home() {
   return (
     <div>
       <h2>Home</h2>
       <SignUpForm/>
     </div>
   )
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm/>
    </div>
  )
}

function PasswordReset() {
  return (
    <div>
      <h2>PasswordReset</h2>
      <PasswordResetForm/>
    </div>
  )
}

function Dashboard() {
  function readerFn({ location }) {
    if (!Userfront.accessToken()) {
      return (
        <Redirect 
        to={{
          pathname: "/login",
          state: { from: location },
        }}
        />
      )
    }

    //if user isLoggedIn redirect to dashboard
    const UserData = JSON.stringify(Userfront.user, null, 2);
    return (
      <div>
        <h2>Dashboard</h2>
        <pre>{UserData}</pre>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    )
  }

  return <Route render={readerFn}/>
}