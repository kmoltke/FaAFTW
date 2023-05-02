import "./styles/template.css"
import "./styles/basket.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {User, UserContext} from "./contexts/UserContext";

import Router from "./router/Router"

// import {UserContextProvider} from "./contexts/UserContext"
import {useState} from "react";

export function App() {
    const [currUser, updateState] = useState<User>(
        {id: 0, fname: "", lname: ""}
    )
    const updateUserFunc = (newUser: User) => {
        updateState(newUser)
    }

    return (
        <UserContext.Provider value={{user: currUser, updateUser: updateUserFunc}}>
            <Router></Router>
        </UserContext.Provider>
    )
}

// export default App
