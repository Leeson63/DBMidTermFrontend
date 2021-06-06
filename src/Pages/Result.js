import React, { useContext, createContext, useState } from "react";
import {
  Link,
} from "react-router-dom";
const resultList = createContext({});

function ProvideResult({ children }) {
  const result = useProvideResult();
  return (
    <resultList.Provider value={result}>
      {children}
    </resultList.Provider>
  );
}

function useResult() {
    return useContext(resultList);
}

function useProvideResult() {
    const [result, setResult] = useState({
        totPage : 0,
        page : 0,
        categories : [],
        searchstring : "",
        items : Array(20).fill(null)
    });

    const updateResult = function(json) {
        setResult(json);
    };
    //const updateResult = (json) => setResult(json);
    return {
        result,
        updateResult
    };
}

export default function Result() {
    const result = useResult();
    const listItems = result.result.items.map((text, i) =>
        <li key={i}><Link to={"/TopicPage/"+text.id}>{"title:" + text.title + ", time:" + text.time}</Link></li>
    );
    console.log(result.result);
    //return (
    //    <>
    //    <div>Result Page</div>
    //    <div>
    //        Page : {result.result.page}/{result.result.totPage}
    //    </div>
    //    <ul>{listItems}</ul>
    //    </>
    //)
    return (
        <>
        <h1>Topics</h1>
        <ul>{listItems}</ul>
        </>
    )
}

export {useProvideResult, ProvideResult, useResult};