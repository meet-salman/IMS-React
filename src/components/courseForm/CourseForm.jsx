import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import uploadFile from '../../config/firebase/FirebaseMethods';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, Backdrop, Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CourseForm = () => {

    const { currentToken } = useContext(UserContext);

    const [loader, setLoderOpen] = useState(false);
    const [alert, setAlertOpen] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [alertType, setAlertType] = useState();
    const [alertMsg, setAlertMsg] = useState();

    const { vertical, horizontal, open } = alert;


    const [titleInputVal, setTitleInputVal] = useState('');
    const [descInputVal, setDescInputVal] = useState('');
    const [instructorInputVal, setInstructorInputVal] = useState('');
    const [durationInputVal, setDurationInputVal] = useState('');
    const [imageInputVal, setImageInputVal] = useState('');



    // BackDrop Open & CLose Function
    const loaderShow = () => {
        setLoderOpen(true);
    };
    const loaderClose = () => {
        setLoderOpen(false);
    };

    //   Alert Show & Close Function
    const alertShow = () => {
        setAlertOpen({ vertical: 'top', horizontal: 'right', open: true });
    };
    const alertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen({ ...alert, open: false });
    };


    // Add Course Function
    const addCourse = (event) => {
        event.preventDefault();
        loaderShow();
        let data = new FormData(event.currentTarget);

        let course = {
            title: data.get('courseName'),
            description: data.get('courseDescription'),
            duration: durationInputVal,
            courseBy: data.get('instructorName')
        }

        // Upload Picture in Firebase Storage
        uploadFile(`${data.get('courseName')} - ${data.get('instructorName')}`, data.get('picture'))
            .then((url) => {
                course.image = url;

                // Adding Course in MongoDB Using API
                axios.post('http://localhost:3001/api/v1/courses/add', course, { headers: { Authorization: `Bearer ${currentToken}` } })
                    .then((res) => {
                        loaderClose();
                        setAlertType('success');
                        setAlertMsg('Course Added Successfully');
                        alertShow();

                        // Empty Form Fields
                        setTitleInputVal('');
                        setDescInputVal('');
                        setInstructorInputVal('');
                        setDurationInputVal('');
                        setImageInputVal('');

                        // console.log(res.data.course);
                    })
                    .catch((error) => {
                        loaderClose();
                        setAlertType('error');
                        setAlertMsg(error.message);
                        alertShow();
                        // console.log(error);
                    });
            })
            .catch((rej) => {
                console.log(rej);
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
                                <TextField label="Course Name" name="courseName" value={titleInputVal} onChange={(e) => setTitleInputVal(e.target.value)} fullWidth required autoFocus />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField label="Course Description" name="courseDescription" value={descInputVal} onChange={(e) => setDescInputVal(e.target.value)} fullWidth required />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField label="Instructor Name" name="instructorName" value={instructorInputVal} onChange={(e) => setInstructorInputVal(e.target.value)} fullWidth required />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel > Course Duration </InputLabel>
                                    <Select
                                        name='courseDuration'
                                        label="Course Duration"
                                        value={durationInputVal}
                                        onChange={(e) => setDurationInputVal(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value={'03 Months'}> 03 Months </MenuItem>
                                        <MenuItem value={'06 Months'}> 06 Months </MenuItem>
                                        <MenuItem value={'12 Months'}> 12 Months </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} >
                                <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} >
                                    Upload file
                                    <input
                                        type="file"
                                        name='picture'
                                        value={imageInputVal}
                                        onChange={(e) => setImageInputVal(e.target.value)}
                                        hidden
                                    />
                                </Button>
                                <Typography sx={{ color: 'gray' }} variant='subtitle1'>Upload cover picture </Typography>
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

            </Box >
        </>
    )
}

export default CourseForm
