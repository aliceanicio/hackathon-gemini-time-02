import React, { useEffect, useState } from "react";

export const LoginContext = React.createContext();

const LoginContextProvider = (props) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token")
        const usersStorage = localStorage.getItem("users_db")

        if(userToken && usersStorage){
            const hasUser = JSON.parse(usersStorage)?.filter((user) => user.username === JSON.parse(userToken).username)
            if(hasUser) setUser(hasUser[0])
        }
    }, [])

    const login = (username, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"))
        const hasUser = usersStorage?.filter((user) => user.username === username)

        if(hasUser?.length){
            if(hasUser[0].username === username && hasUser[0].password == password){
                const token = Math.random().toString(36).substring(2)
                localStorage.setItem("user_token", JSON.stringify({username, token}))
                setUser({username, password})
                return
            }else{
                return "Usuário ou senha incorreto"
            }
        }else{
            return "Usuário não cadastrado"
        }
    }

    const register = (username, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"))
        const hasUser = usersStorage?.filter((user) => user.username === username)
        if(hasUser?.length){
            return "Já tem uma conta com esse usuário"
        }

        let newList
         
        if(usersStorage){
            newList = [...usersStorage, {username, password}]
        }else{
            newList = [{username, password}] 
        }

        localStorage.setItem("users_db", JSON.stringify(newList))
        return
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user_token")
    }

    return (
        <LoginContext.Provider value={{user, signed: !!user, login, register, logout}}>
            {props.children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;