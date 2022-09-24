import { Card, CardContent, Container, Grid, IconButton, makeStyles, Typography, useTheme } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCardapio } from '../../services/cardapio.service';
import CardMedia from '@material-ui/core/CardMedia';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
 
}));


export default function CardapioPage() {
  const [cardapio, setCardapio] = useState([]);
  const classes = useStyles();
  const theme = useTheme();

  const {id} = useParams()

  let formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

  useEffect(() => {
      axios.get(`https://itc-fvg-default-rtdb.firebaseio.com/detalhes/${id}.json`).then(data => {setCardapio(data.data.cardapio); console.log(data.data.cardapio)})
      }, []);

  return (
    <div>

      {cardapio && cardapio.map((item, i) => (
        <Container key={i}>
          <Typography variant="body1" className={classes.cardapioTitle}>
            {item.categoria}
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            
          </Grid>

        </Container>
      ))}
      
    </div>
  )
}
