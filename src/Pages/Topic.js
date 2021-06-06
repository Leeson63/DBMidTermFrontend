import axios from "axios";
import React, { useContext, createContext, createElement, useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import {Button, Space, Tooltip, Comment, Avatar} from "antd"
import {MyComment} from "../Component/MyComment"
  
export default function Topic(props) {
    const [all, setAll] = useState({});
    const [text, setText] = useState("");
    let {topic_id} = useParams();

    function handleOnChange(e) {
        return setText(e.target.value);
    }

    function handleOnClick(e) {
        e.preventDefault();
        let url = "/api/topic/" + topic_id + "/";
        let json = { content: text };
        axios.post(url, JSON.stringify(json))
            .then(
                function (response) {
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
                function (error) {
                    console.log(error);
                    alert(error);
                }
            )
    }

    useEffect(
        function() {
            let url = "/api/topic/"+topic_id+"/";
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
        || all.torrents.length === 0) ? ["empty!"] : all.torrents.map(
            (json, i) =>
                <li key={i}>
                    <Link to={"/TorrentPage/" + json.id}>
                        torrent:{json.name}(score:{json.score})
                    </Link>
                </li>);
    var reply_items = (all.replies === null 
        || all.replies===undefined
        || all.replies.length===0) ? ["no one reply"] : all.replies.map( 
            (json) => <MyComment name={json.user__name} content={json.content}/>
            );
    //var reply_items = <MyComment name="lala" content="gay!" />;

    return (
        <>
            <h1> {all.title} </h1>
            <h2> torrents: </h2>
            <ul>{torrent_items}</ul>
            <h2> introduction:</h2>
            <div>{all.content}</div>
            <h2>reply:</h2>
            <div>{reply_items}</div>
            <h2>post your reply:</h2>
            <div>
                <textarea onChange={handleOnChange} value={text} maxLength={200} style={{width : '30%', resize: 'none' }} />
            </div>
            <Button onClick={handleOnClick}>sumbit</Button>
        </>
    );
}
