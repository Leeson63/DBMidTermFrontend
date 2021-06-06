import React, { useState } from "react";
import {Button, Tooltip, Space} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import axios from 'axios'
import {
  useHistory,
} from "react-router-dom";

import {useResult} from "../Pages/Result.js"


export default function Search(props) {
    const [searchText, setSearchText] = useState("");
    const result = useResult();
    let history = useHistory();

    function handleOnChange(event) {
        return setSearchText(event.target.value);
    }

    function handleOnClick(event) {
        event.preventDefault();
        var requestjson = {
            page : 1,
            searchstring : searchText
        };
        console.log(requestjson);
        var ret;
        axios.post("/api/search/", requestjson)
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
                        history.push("/Result");
                    } 
                    else {
                        alert("search error");
                    }
                }
            ).catch(
                function(error) {
                    console.log(error);
                }
            );
    }

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