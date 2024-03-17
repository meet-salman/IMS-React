import { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios';

const UserContextProvider = ({ children }) => {

    const [isUser, setIsUser] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [currentToken, setCurrentToken] = useState();
    const [allStudents, setAllStudents] = useState();

    // // UseEffect to set Global States
    useEffect(() => {

        // Getting Logged In User Token
        const token = JSON.parse(localStorage.getItem('token'));
        setCurrentToken(token);

        // Getting Logged In User
        const user = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(user);

        // Check isToken to Get Students Data For Admin 
        if (token) {
            setIsUser(true);

            // Getting Students Data if Admin Login
            if (user.type === 'admin') {

                // Fetch Data Using API
                axios('http://localhost:3001/api/v1/students', {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        console.log(res.data.students);
                        let data = res.data.students;
                        let arr = [];

                        data.map(item => {
                            if (item.type === 'student') {
                                arr.push(item);
                            }
                        })
                        setAllStudents(arr);
                    })
                    .catch((rej) => {
                        console.log(rej);
                    })
            }

        }
        else {
            setIsUser(false);
            setCurrentToken();
            setCurrentUser();
        }

    }, [currentToken]);

    return (
        <>
            <UserContext.Provider value={{ isUser, setIsUser, currentUser, setCurrentUser, currentToken, setCurrentToken, allStudents, setAllStudents }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default UserContextProvider
