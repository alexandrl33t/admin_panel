import '../../App.css';
import React, {useState} from "react";
import Login from "./login";
import TwoFactorsAuthentication from "./twoFactorsAuthentication";
function Authorization(state) {
    const {bg} = state
    const [login, setLogin ]= useState(false)
    return (
        <div className={bg}>
            <div style={{alignContent: "center"}}>
                <div id="wrapper">
                    {login ?
                    <TwoFactorsAuthentication />:
                    <Login setLogin={setLogin} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Authorization;