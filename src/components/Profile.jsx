import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Player from "../images/player.jpg"

const Profile = (props) => {
  return (
    <Card sx={{ width: "345px", height:"550px", background:"#444444" }} style={props.style}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="300"
        image={Player}
        alt="player image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" align="center" component="div" color={"white"}>
          {props.playerID.name}
        </Typography>
        <Typography variant="h1" align="center" component="div" color={"white"}>
          {props.playerID.points}
        </Typography>
        <Typography variant="h6" align="center" component="div" color={"white"}>
          points
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

export default Profile