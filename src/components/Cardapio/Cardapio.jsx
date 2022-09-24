import { Card, CardContent, Container, Divider, Grid, IconButton, makeStyles, Typography, useTheme } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCardapio } from '../../services/cardapio.service';
import CardMedia from '@material-ui/core/CardMedia';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import './Cardapio.css'

const useStyles = makeStyles((theme) => ({
  cardapioTitle: {
      fontWeight: 'bold',
      margin: 16
  },
  root: {
    display: 'flex',
    width: 330,
    boxShadow: 'none',
    backgroundColor: "#FBFBFB"
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
    height: 89,
    marginLeft: 5
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  productDescription: {
    fontSize: 12
  },
  price: {
    fontWeight: 'bold'
  }
}));


export default function CardapioPage({cardapio}) {
  const classes = useStyles();

  const {id} = useParams()

  let formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

  

  return (
    <div>
        
        <Container >
          
          <Grid container spacing={3} justifyContent="center">
            {cardapio.itens.map((produto,i) => (
              <Grid item key={i}>
                <Card className={classes.root}>
                    <CardMedia
                      className={classes.cover}
                      image={produto.imagem}
                    />
                  <div className={classes.details}>
                    <CardContent className={`${classes.content} contentCard`}>
                      <Typography variant="h6" className={classes.productTitle}>
                        {produto.nome}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" className={classes.productDescription}> 
                        {produto.descricao}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" align='right' className={classes.price}>
                        {formatter.format(produto.valor)}
                      </Typography>
                    </CardContent>
                  </div>
                  
                </Card>
                <Divider/>
              </Grid>
            ))}
          </Grid>

        </Container>
      
    </div>
  )
}
