import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CourseCard from '../card/CourseCard';
import StudentsTable from '../table/StudentsTable';
import CourseForm from '../courseForm/CourseForm';
import { getAllData } from '../../config/firebase/FirebaseMethods';
import { useEffect } from 'react';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [allCourses, setAllCourses] = React.useState([])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        getAllData('Courses')
            .then((res) => {
                setAllCourses(res)
            })
            .catch((rej) => {
                console.log(rej);
            })

    }, [])




    return (

        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="All Students" {...a11yProps(0)} />
                    <Tab label="All Courses" {...a11yProps(1)} />
                    <Tab label="Add Course" {...a11yProps(2)} />
                </Tabs>
            </Box>

            {/* All Students Tab */}
            <CustomTabPanel value={value} index={0}>
                < StudentsTable />
            </CustomTabPanel>

            {/* All Courses Tab */}
            <CustomTabPanel value={value} index={1}>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    {allCourses.length > 0 ?
                        allCourses.map((item) => {
                            return <CourseCard title={item.courseName} description={item.courseDescription} trainer={item.instructorName} showButon={false} />
                        })
                        : <Typography variant='h5' sx={{ fontFamily: '"Inter", sans-serif', textAlign: 'center', color: 'grey' }}> Loading... </Typography>}
                </Box>
            </CustomTabPanel>

            {/* Courses Add Form */}
            <CustomTabPanel value={value} index={2}>
                <CourseForm />
            </CustomTabPanel>

        </Box>
    );
}
