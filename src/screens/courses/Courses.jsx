import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CourseCard from '../../components/card/CourseCard'

const Courses = () => {

    const [allCourses, setAllCourses] = React.useState([])

    // UseEffect to getting all Courses
    // useEffect(() => {

    //     getAllData('Courses')
    //         .then((res) => {
    //             setAllCourses(res)
    //             console.log(res);
    //         })
    //         .catch((rej) => {
    //             console.log(rej);
    //         })

    // }, [])

    return (
        <>
            <Box sx={{ minHeight: '80vh' }} >

                <Typography variant='h4' sx={{ paddingTop: '40px', textAlign: 'center' }}> All Courses </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '50px', justifyContent: 'center' }}>
                    {allCourses.length > 0 ?
                        allCourses.map((item) => {
                            return <CourseCard key={item.documentId} title={item.courseName} description={item.courseDescription} trainer={item.instructorName} id={item.documentId} showButon={true} />
                        })
                        : <Typography variant='h5' sx={{ fontFamily: '"Inter", sans-serif', textAlign: 'center', color: 'grey' }}> Loading... </Typography>}
                </Box>

            </Box>
        </>
    )
}

export default Courses
