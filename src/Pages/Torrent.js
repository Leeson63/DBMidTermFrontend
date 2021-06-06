import axios from "axios";
import React, { useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom";

import "../App.css"

import {Button, PageHeader, Rate} from 'antd';
import { MyComment } from "../Component/MyComment";

export default function TorrentPage(props) {
    const [all, setAll] = useState({});
    const [rate, setRate] = useState(5);
    const [text, setText] = useState("");
    let {torrent_id} = useParams();
    
    useEffect(
        function () {
            let url = "/api/torrent/" + torrent_id + "/";
            axios.get(url)
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
        }, []
    )

    function rateOnChange(value) {
        setRate(value);
    }

    function textareaOnChange(e) {
        setText(e.target.value);
    }

    function requestServer(url, json) {
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

    function buttonOnChange(e) {
        e.preventDefault();

        if (text === "") {
            alert("comment should not be empty!");
            return;
        }

        let url = "/api/torrent/" + torrent_id + "/";
        let json = { method : "rate", content: text, score : rate};
        requestServer(url, json);
    }

    function downloadOnChange(e) {
        e.preventDefault();
        let url = "/api/torrent/" + torrent_id + "/";
        let json = { method : "download"};
        requestServer(url, json);
        alert("download success!");
    }

    return (
        <>
            <PageHeader
                className="site-page-header"
                title={all.name}
            />
            <h3>Basic Information</h3>
            <ul>
                <li> link: {all.link} </li>
                <li> upload by: {all.uploadByUser}</li>
                <li> upload time: {all.time} </li>
                <li> file size: {all.size} </li>
                <li> tag :
                    {
                        all.categories===null||all.categories===undefined||all.length===0 ?
                        "untagged" : 
                        all.categories.map(
                            (json) => <span style={{ padding: "0 10px 0 10px" }}><u>{json.name}</u></span>
                        )
                    }
                </li>
            </ul>
            <h3>Stats</h3>
            <ul>
                {
                    all.categories===undefined ?
                    <></>
                    :
                    <>
                    <li> download count: {all.count} </li>
                    <li> lowest score : <Rate disabled allowHalf value={all.ratestats[0].minimum}/> </li>
                    <li> highest score : <Rate disabled allowHalf value={all.ratestats[0].maximum}/> </li>
                    <li> average score : <Rate disabled allowHalf value={all.ratestats[0].average}/> </li>
                    <li> lowest score in 7 days : <Rate disabled allowHalf value={all.ratestats[0].min7}/></li>
                    <li> highest score in 7 days : <Rate disabled allowHalf value={all.ratestats[0].max7}/></li>
                    <li> average score in 7 days : <Rate disabled allowHalf value={all.ratestats[0].avg7}/></li>
                    </>
                }
            </ul>
            <h3>Comment and score</h3>
            {
                all.rates===undefined ?
                <></>
                :
                all.rates.map(
                    json=>
                    <>
                        <MyComment name={json.user__name} content={json.content}/>
                        <Rate disabled value={json.score}/>
                    </>
                )
            }
            <h3 style={{margin: "30px 0 10px 0"}} >Post your comment and score</h3>
            <div>
            <textarea onChange={textareaOnChange} value={text} maxLength={200} style={{width: '50%', resize: 'none'}}/>
            </div>
            Score: <Rate onChange={rateOnChange} value={rate} style={{margin : "0 10px"}}/>
            <Button onClick={buttonOnChange}>sumbit</Button>
            <h3 style={{margin: "30px 0 0 0"}}>Download : <Button onClick={downloadOnChange}>download</Button></h3>
        </>
    )
}