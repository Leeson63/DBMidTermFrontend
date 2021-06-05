import React, { useContext, createContext, useState } from "react";
import axios from "axios"

const authContext = createContext();

const fakeAuth = {
  isAuthenticated: false,
  signin(username, password, cb) {
    axios.post("/api/login/", JSON.stringify({uname : username, password : password}))
        .then(
            function(response) {
                var resp = response.data;
                console.log(resp);
                if (resp.code === 200) {
                    cb();
                }
                else {
                    alert(resp.msg);
                }
            }
        ).catch(
            function(error) {
                console.log(error);
                alert(error);
            }
        );
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

// useProvideAuth 创建了一个全局变量的实例 useAuth() ，每次调用 useAuth 就能够判断当前的登录情况
// 也能增加修改方法，进行授权的改变
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (username, password, cb) => {
    return fakeAuth.signin(username, password, () => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}


export {useAuth, ProvideAuth};