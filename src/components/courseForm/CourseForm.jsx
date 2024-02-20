import { Alert, Backdrop, Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, TextareaAutosize } from '@mui/material'
import React, { useRef, useState } from 'react'
import { sendData } from '../../config/firebase/FirebaseMethods';

const CourseForm = () => {

    const [courseduration, setCourseDuration] = React.useState('');

    const [loader, setLoderOpen] = React.useState(false);
    const [alert, setAlertOpen] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [alertType, setAlertType] = React.useState();
    const [alertMsg, setAlertMsg] = React.useState();

    const { vertical, horizontal, open } = alert;


    // BackDrop Open & CLose Function
    const loaderShow = () => {
        setLoderOpen(true);
    };
    const loaderClose = () => {
        setLoderOpen(false);
    };

    //   Alert Show & Close Function
    const alertShow = (newState) => {
        setAlertOpen({ ...newState, open: true });
    };
    const alertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen({ ...alert, open: false });
    };


    const handleChange = (event) => {
        setCourseDuration(event.target.value);
    };


    const emptyField = useRef();
    const addCourse = (event) => {
        event.preventDefault();
        loaderShow()
        let data = new FormData(event.currentTarget);

        sendData({
            courseName: data.get('courseName'),
            courseDescription: data.get('courseDescription'),
            courseDuration: courseduration,
            instructorName: data.get('instructorName')
        }, 'Courses')
            .then((res) => {
                loaderClose()

                setAlertType('success')
                setAlertMsg('Course Added Successfully')
                alertShow({ vertical: 'top', horizontal: 'right' })
            })
            .catch((rej) => {
                loaderClose()

                setAlertType('error')
                setAlertMsg(`${rej}`)
                alertShow({ vertical: 'top', horizontal: 'right' })
            })

    }


    return (
        <>
            <Box>

                {/* Form Area */}
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '50px' }}>

                    {/* Course Add Form */}
                    <Box component="form" onSubmit={addCourse} sx={{ width: '50%' }}>
                        {/* Form Fields */}
                        <Grid container spacing={2} >

                            <Grid item xs={12}>
                                <TextField label="Course Name" name="courseName" fullWidth required autoFocus />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField label="Course Description" name="courseDescription" fullWidth required />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField label="Instructor Name" name="instructorName" fullWidth required />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel > Course Duration </InputLabel>
                                    <Select
                                        labelId="course-duration"
                                        id="course-duration"
                                        value={courseduration}
                                        label="Course Duration"
                                        fullWidth
                                        onChange={handleChange}
                                        ref={emptyField}
                                    >
                                        <MenuItem value={'03 Months'}> 03 Months </MenuItem>
                                        <MenuItem value={'06 Months'}> 06 Months </MenuItem>
                                        <MenuItem value={'12 Months'}> 12 Months </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>

                        {/* Register Button */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}> Add Course  </Button>
                    </Box>

                </Box>

                {/* Backdrop */}
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}  >
                    <CircularProgress color="inherit" />
                </Backdrop>

                {/* Alert */}
                <Snackbar open={open} autoHideDuration={2000} onClose={alertClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} >
                    <Alert severity={alertType} variant="filled" sx={{ width: '100%' }} > {alertMsg} </Alert>
                </Snackbar>

            </Box>
        </>
    )
}

export default CourseForm
