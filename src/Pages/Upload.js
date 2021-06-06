import axios from "axios";
import React, { useState, useEffect, useContext, createContext, history} from "react";
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

import {Space, Button, PageHeader, Rate, Checkbox} from 'antd';

const reqList = createContext(new Set());

function NameCheckBox(props) {
    const [checked, setChecked] = useState(false);
    const req = useContext(reqList);

    function handleOnChange(e) {
        console.log(e.target.checked);
        if (e.target.checked) {
            req.add(props.text);
        }
        else {
            req.delete(props.text);
        }
        return setChecked(e.target.checked);
    }
    
    return (
        <>
        <Checkbox {...props} onChange={handleOnChange} />
        <label>{"  " + props.text}</label>
        </>
    );
}

function CheckBoxRow(props) {
    if (props.textlist !== null) {
        let row = props.textlist.map((text) => <NameCheckBox key={text} text={text} />);
        return (
            <> 
            <Space wrap>
            {row} 
            </Space>
            </>
        );
    }
    else {
        return (
            <> </>
        );
    }
}
export default function Upload() {
    const [all, setAll] = useState({
        name : "",
        link : "",
        permission : 6,
        size : "",
        categories: ["fa", "dfa", "fsfa", "fsfsd", "dfsfsd"],
    });
    const req = useContext(reqList);

    // get categories
    useEffect( ()=>
    axios.get("/api/select/")
        .then(
            function(response) {
                var resp = response.data;
                console.log(resp);
                if (resp.code === 200) {
                    //setCategories(resp.data.categories);
                    //console.log("categories: "+categories);
                    var json = {
                        name : all.name,
                        link : all.link,
                        permission : all.link,
                        size : all.link,
                        categories: resp.data.categories,
                    };
                    setAll(json);
                }
                else {
                    alert(resp.msg);
                }
            }
        ).catch({
            function(error) {
                console.log(error);
                alert(error);
            }
        })
        , []);

    return (
        <reqList.Provider value={req}>
            <h1>Upload</h1>
            <p>
                name: <input 
                onChange={ 
                    function linkOnChange(e) {
                        var json = {
                            name : e.target.value,
                            link : all.link,
                            permission : all.permission,
                            size : all.size,
                            categories: all.categories,
                        }
                        setAll(json);
                    }
                }
                value={
                    all===undefined?
                    "" : all.name
                }
                />
            </p>
            <p>
                link: <input 
                onChange={ 
                    function linkOnChange(e) {
                        var json = {
                            name : all.name,
                            link : e.target.value,
                            permission : all.permission,
                            size : all.size,
                            categories: all.categories,
                        }
                        setAll(json);
                    }
                }
                value={
                    all===undefined?
                    "" : all.link
                }
                />
            </p>
            <p>
                permission: <Rate
                    count={6}
                    onChange={
                        function permissionOnChange(value) {
                            var json = {
                                name : all.name,
                                link: all.link,
                                permission: value,
                                size: all.size,
                                categories: all.categories,
                            }
                            setAll(json)
                        }
                    }
                    value={
                        all===undefined? "" : all.permission
                    } />
            </p>
            <p>
                size: <input 
                onChange={ 
                    function (e) {
                        var json = {
                            name : all.name,
                            link : all.link,
                            permission : all.permission,
                            size : e.target.value,
                            categories: all.categories,
                        }
                        setAll(json);
                    }
                }
                value={
                    all===undefined?  "" : all.size
                }
                />
            </p>                
            <p>
                choose tags: <CheckBoxRow textlist={all.categories}/>
            </p>
            <p>
                <Button
                    onClick={
                        function handleClick(e) {
                            e.preventDefault();
                            console.log(req);
                            var requestjson = {
                                name : all.name,
                                link: all.link,
                                permission : all.permission,
                                size : all.size,
                                categories: Array.from(req),
                            };
                            console.log(requestjson);
                            var ret;
                            axios.post("/api/upload/", JSON.stringify(requestjson))
                                .then(
                                    function (response) {
                                        var data = response.data;
                                        console.log("data.totPage:" + data.data.totPage);
                                        if (data.code === 200) {
                                            alert("Upload success");
                                            history.push("/");
                                        }
                                        else {
                                            alert("error in request results");
                                        }
                                    }
                                ).catch(
                                    function (error) {
                                        console.log(error);
                                    }
                                );
                        }
                    }>
                    upload</Button>
            </p>
        </reqList.Provider>
    );
}