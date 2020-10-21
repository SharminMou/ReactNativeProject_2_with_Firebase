import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = (props) =>{
    const [CurrentUser, setCurrentUSer] = useState({});
    const [IsLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <AuthContext.Provider
            value={{
                CurrentUser: CurrentUser,
                setCurrentUSer: setCurrentUSer,
                IsLoggedIn: IsLoggedIn,
                setIsLoggedIn: setIsLoggedIn,
            }}
        >
             {props.children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider}