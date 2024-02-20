import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarRating from '../../components/rating/Rating';

export default function CourseCard(props) {

    const { title, description, trainer } = props

    return (
        <Card sx={{ width: 280 }}>

            <CardMedia
                sx={{ height: 200 }}
                image="https://emarsys.com/app/uploads/2020/03/real-ai.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography variant="h6" component="div"> {title.slice(0, 20)}... </Typography>
                <Typography gutterBottom variant="body1" color="text.secondary"> {description.slice(0, 30)}... </Typography>
                <Typography variant="body2" color="text.secondary"> <b>Trainer:</b> {trainer} </Typography>
                <Typography variant="subtitle1"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '600'
                    }}
                >
                    3.4 &nbsp; <StarRating rating={3.4} />
                    <Typography variant='body2'> &#10088;45,278&#10089; </Typography>
                </Typography>

            </CardContent>

            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>

        </Card>
    );
}