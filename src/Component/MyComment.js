import {Tooltip, Comment, Avatar} from "antd"
import axios from "axios";
import React, { useContext, createContext, createElement, useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

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
      /*
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
      <span key="comment-basic-reply-to">Reply to</span>,*/
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

export {MyComment};