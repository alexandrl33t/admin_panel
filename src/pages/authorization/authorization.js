import 'antd/dist/antd.min.css';
import '../../App.css';
import Header from "../../components/header";
import {useState} from "react";
import Login from "./login";
import TwoFactorsAuthentication from "./twoFactorsAuthentication";
function Authorization() {
    const [login, setLogin ]= useState(false)
    return (
        <>
            <Header />
            <div style={{alignContent: "center"}}>
                <div id="wrapper">
                    {login ?
                    <TwoFactorsAuthentication />:
                    <Login setLogin={setLogin} />
                    }
                </div>
            </div>
        </>
    );
}

export default Authorization;