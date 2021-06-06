import React, { useState } from "react";
import {Button, Tooltip, Space} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import {
  useHistory,
} from "react-router-dom";

import {useResult} from "../Pages/Result.js"

function getResult(searchText) {
    /* TODO */

    return {
        totPage : 1,
        page : 1,
        items : Array(20).fill(searchText)
    }
}

export default function Search(props) {
    const [searchText, setSearchText] = useState("");
    const result = useResult();
    let history = useHistory();

    function handleOnChange(event) {
        return setSearchText(event.target.value);
    }

    function handleOnClick(event) {
        event.preventDefault();
        result.updateResult(getResult(searchText));
        history.push("/Result");
    }

    /*
    return (
        <>
        <h1>Search Page</h1>
        <input onChange={handleOnChange} value={searchText}/>
        <button onClick={handleOnClick}> Search </button>
        </>
    )*/
    return (
            <>
            <h1>Search Page</h1>
            <Space>
            <input onChange={handleOnChange} value={searchText}/>
            <Tooltip title="search">
              <Button onClick={handleOnClick} type="primary" shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            </Space>
            </>
        )
}