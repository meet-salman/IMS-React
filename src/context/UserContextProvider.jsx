import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import { getAllData, getUserData, userExist } from '../config/firebase/FirebaseMethods';

const UserContextProvider = ({ children }) => {

    const [isUser, setIsUser] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [allStudents, setAllStudents] = useState();

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

        // Getting Students Data
        getAllData('students')
            .then((res) => {
                let arr = [];
                res.map((item) => {
                    if (item.type === 'student') {
                        arr.push(item)
                    }
                })
                setAllStudents(arr)
            })
            .catch((rej) => {
                console.log(rej);
            })

    }, [])

    return (
        <>
            <UserContext.Provider value={{ isUser, setIsUser, currentUser, setCurrentUser, allStudents, setAllStudents }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default UserContextProvider
