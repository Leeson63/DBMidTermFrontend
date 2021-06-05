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
                    var data = response.data;
                    console.log(data);
                    if (data.code === 200) {
                        setAll(data.data);
                    }
                    else {
                        alert(data.msg);
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

    var torrent_items = (all.torrents === null 
        || all.torrents===undefined
        || all.torrents.length===0) ? ["empty!"] : all.torrents.map( (json) => <li> {json.name} </li>);
    var reply_items = (all.replies === null 
        || all.replies===undefined
        || all.replies.length===0) ? ["no one reply"] : all.replies.map( (json) => <li> {json.name} </li>);

    return (
        <>
            <h1> {all.title} </h1>
            <h2> torrents: </h2>
            <ul>{torrent_items}</ul>
            <h2> introduction:</h2>
            <div>{all.content}</div>
            <h2>reply:</h2>
            <div>{reply_items}</div>
        </>
    );
}
