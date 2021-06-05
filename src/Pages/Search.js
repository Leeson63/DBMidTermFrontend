import React, { useState } from "react";
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

    return (
        <>
        <div>Search Page</div>
        <input onChange={handleOnChange} value={searchText}/>
        <button onClick={handleOnClick}> Search </button>
        </>
    )
}