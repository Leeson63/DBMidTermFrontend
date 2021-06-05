import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

export default function Topic(props) {
    const [all, setAll] = useState({});

    useEffect(
        function() {
            let url = "/api/topic/"+props.match.params.topic_id+"/";
            console.log(url);
            axios.get(url)
            .then(
                function(response) {
                    var data = response;
                    console.log(data);
                    if (data.code === 200) {
                        setAll(data.data);
                    }
                    else {
                        alert(data.msg)
                    }
                }
            )
            .catch(
                function(error) {
                    console.log(error);
                    alert(error);
                }
            )
        }, []
    );
    return (
        <>
            <h1> {all.title} </h1>
            <div> Topic id : {props.match.params.topic_id}</div>
        </>
    );
}
