import React, { useContext, createContext, useState, useEffect } from "react";
import {useResult} from "./Result.js"
import {useHistory} from "react-router-dom"
import axios from "axios"
import { Checkbox, Button,Space } from 'antd';

export default function Post() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [torrent, setTorrent] = useState("");

    return (
        <>
            <h1>Post</h1>
            <p>
                <Space align="start">
                    Title:
                    <input 
                        onChange={
                            function(e) {
                                setTitle(e.target.value);
                            }
                        }
                        value={
                            title===undefined ? "":title
                        }
                    />
                </Space>
            </p>
            <p>
                <Space align="start">
                    Content:
                    <textarea 
                        onChange={
                            function(e) {
                                setContent(e.target.value);
                            }
                        }
                        value={
                            title===undefined ? "":content
                        }
                    />
                </Space>
            </p>
            <p>
                <Space align="start">
                    torrent:
                    <textarea 
                        onChange={
                            function(e) {
                                setTorrent(e.target.value);
                            }
                        }
                        value={
                            title===undefined ? "":torrent
                        }
                    />
                </Space>
            </p>
            <p>
                <Button
                    onClick={
                        function (e) {
                            e.preventDefault();
                            var url = "/api/post/";
                            var json = {
                                title : title,
                                content : content,
                                torrent_ids : torrent
                            }
                            axios.post(url, json)
                                .then(
                                    function (response) {
                                        var resp = response.data;
                                        console.log(resp);
                                        if (resp.code === 200) {
                                            alert("post success!");
                                        }
                                        else {
                                            alert("post fail!");
                                        }
                                    }
                                ).catch({
                                    function(error) {
                                        console.log(error);
                                        alert(error);
                                    }
                                })
                        }
                    }
                >post</Button>
            </p>
        </>
    )
}