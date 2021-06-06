import React, { useContext, createContext, useState, useEffect } from "react";
import {useResult} from "./Result.js"
import {useHistory} from "react-router-dom"
import axios from "axios"
import { Checkbox, Button,Space } from 'antd';

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

function requestResult(page, req) {
    /* TODO */
    var json = {
        page : page,
        req : req
    };
    var ret;
    axios.post("/api/topics/", JSON.stringify(json))
        .then(
            function(response) {
                var data = response.data;
                if (data.code === 200) {
                    ret = data.data;
                    console.log(ret);
                } 
                else {
                    alert("error in request results");
                }
            }
        ).catch(
            function(error) {
                console.log(error);
            }
        );

    return ret;
}

export default function Filter() {
    const [categories, setCategories] = useState(null);
    const req = useContext(reqList);
    const result = useResult();
    const history = useHistory();
    req.clear();

    useEffect( ()=>
    axios.get("/api/select/")
        .then(
            function(response) {
                var resp = response.data;
                console.log(resp);
                if (resp.code === 200) {
                    setCategories(resp.data.categories);
                    console.log("categories: "+categories);
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

    function handleClick(e) {
        e.preventDefault();
        console.log(req);
        var requestjson = {
            page : 1,
            categories : Array.from(req)
        };
        console.log(requestjson);
        var ret;
        axios.post("/api/topics/", JSON.stringify(requestjson))
            .then(
                function(response) {
                    var data = response.data;
                    console.log("data.totPage:" + data.data.totPage);
                    if (data.code === 200) {
                        ret = data.data;
                        result.updateResult({
                            page: 1,
                            totPage: ret.totPage,
                            items: ret.topics
                        })
                        //console.log(result.result);
                        history.push("/Result");
                    } 
                    else {
                        alert("error in request results");
                    }
                }
            ).catch(
                function(error) {
                    console.log(error);
                }
            );
    }

    return (
        <reqList.Provider value={req}>
            <h1>Filter Page</h1>
            <Space direction="vertical">
                <div>
                    <CheckBoxRow textlist={categories} />
                </div>
                <Button onClick={handleClick}>apply</Button>
            </Space>
        </reqList.Provider>
    )
}
