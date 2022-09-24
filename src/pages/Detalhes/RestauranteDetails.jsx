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
import Cardapio from '../../components/Cardapio';

const useStyles = makeStyles((theme) => ({
  cardapioTitle: {
      fontWeight: 'bold',
      margin: 16
  },
  root: {
    display: 'flex',
    width: 330
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: 200
  },
  cover: {
    width: 89,
    height: 89
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  productTitle: {
    fontSize: 16
  },
  productDescription: {
    fontSize: 12
  },
  price: {
    fontWeight: 'bold'
  }
}));


export default function CardapioPage() {
  const [cardapio, setCardapio] = useState([]);
  const classes = useStyles();
  const theme = useTheme();

  const {id} = useParams()

  useEffect(() => {
      axios.get(`https://itc-fvg-default-rtdb.firebaseio.com/detalhes/${id}.json`).then(data => {setCardapio(data.data.cardapio)})
      }, []);

  return (
    <div>

      {cardapio && cardapio.map((item, i) => (
        <Cardapio key={i} cardapio={item}></Cardapio>
      ))}
      
    </div>
  )
}
