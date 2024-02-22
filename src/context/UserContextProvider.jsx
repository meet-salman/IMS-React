import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import { getUserData, userExist } from '../config/firebase/FirebaseMethods';

const UserContextProvider = ({ children }) => {

    const [isUser, setIsUser] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    // UseEffect to set Global States
    useEffect(() => {

        // Checking User LoggenIn or Not
        userExist()
            .then((res) => {
                setIsUser(true)

                // Getting User Data From Firebase
                getUserData()
                    .then((res) => {
                        setCurrentUser(res)
                    })
                    .catch((rej) => {
                        // console.log(rej);
                        setIsUser(false)
                    })
            })
            .catch((rej) => {
                // User Not LoggedIn
            })
    }, [])

    return (
        <>
            <UserContext.Provider value={{ isUser, setIsUser, currentUser, setCurrentUser }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default UserContextProvider
