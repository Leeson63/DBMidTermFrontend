import axios from "axios";
import React, { useContext, createContext, createElement, useState, useEffect } from "react";

import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import {Tooltip, Comment, Avatar} from "antd"

const MyComment = (props) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
  
    const like = () => {
      setLikes(1);
      setDislikes(0);
      setAction('liked');
    };
  
    const dislike = () => {
      setLikes(0);
      setDislikes(1);
      setAction('disliked');
    };
  
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];
  
    return (
      <Comment
        actions={actions}
        author={<p>{props.name}</p>}
        avatar={
          <Avatar> 
          {props.name[0]}</Avatar>
        }
        content={
          <p>
              {props.content}
          </p>
        }
    
      />
    );
};
  
export default function Topic(props) {
    const [all, setAll] = useState({});
    const [text, setText] = useState("");

    function handleOnChange(e) {
        return setText(e.target.value);
    }

    function handleOnClick(e) {
        e.preventDefault();
        let url = "/api/topic/" + props.match.params.topic_id + "/";
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
        || all.torrents.length===0) ? ["empty!"] : all.torrents.map( (json, i) => <li key={i}> {json.name} </li>);
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
            <textarea onChange={handleOnChange} value={text} maxLength={200} style={{width: '50%', resize: 'none'}}/>
            <button onClick={handleOnClick}>sumbit</button>
        </>
    );
}
