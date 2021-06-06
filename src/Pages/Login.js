import React, { useState } from "react";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import { useAuth} from "../Component/authority.js"

import {Button} from "antd"
import 'antd/dist/antd.css';

export default function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    let { from } = location.state || { from: { pathname: "/" } };

    // 调用 login 会进行页面跳转，并且设置用户的登录状态
    let login = (e) => {
        e.preventDefault()
        auth.signin(username, password, () => {
            // 从一个非法的地址不能返回
            history.replace(from);
        });
    };

    function passwordOnChangeHandler(e) {
        return setPassword(e.target.value);
    }
    
    function usernameOnChangeHandler(e) {
        return setUsername(e.target.value);
    }

    const mystyle = {
         padding : "5px"
    };

    return (
        <div>
            <h1 align="center">btForum</h1>
            <div align="center">
                <div style={mystyle}>
                    <label> username:</label>
                    <input onChange={usernameOnChangeHandler} value={username} />
                </div>
                <div style={mystyle}>
                    <label> password:</label>
                    <input type="password" onChange={passwordOnChangeHandler} value={password} />
                </div>
            </div>
            <div align="center">
                <Button onClick={login}>Log in</Button>
            </div>
        </div>
    );
}