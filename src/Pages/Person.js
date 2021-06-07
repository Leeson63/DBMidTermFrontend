import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Person() {
    const [text, setText] = useState({});

    useEffect(
        function () {
            axios.get("/api/account/")
                .then(
                    function (response) {
                        var data = response.data;
                        if (data.code === 200) {
                            setText(data.data);
                        } else {
                            alert("error in get user's information");
                        }
                    })
                .catch(
                    function (e) {
                        alert(e);
                    })
        }
    , [])
    return (
        <>
        <h1>Acount Infos</h1>
        <p>
            name : {text.name}
        </p>
        <p>
            totUp : {text.totUp}
        </p>
        <p>
            totDown : {text.totDown}
        </p>
        <p>
            privilege : {text.privilege}
        </p>
        </>
    )
}