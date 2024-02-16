import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (

        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        
    );
}


export default function StickyFooter() {
    return (

        <>
            <Box
                sx={{
                    height: '10vh',
                    display: 'flex',
                    justifyContent: 'center',
                    placeItems: 'center',
                    backgroundColor: '#f6f8fa'
                }}
            >
                <Copyright />
            </Box>
        </>


    );
}