import { Container, Typography, CircularProgress, makeStyles, Box, Card, CardActionArea, CardContent, CardMedia } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cardapio from "../../components/Cardapio";
import { getCardapio } from "../../services/cardapio.service";
import { getRestaurantes } from "../../services/restaurantes.service";
import "./style.css";
import StarIcon from '@material-ui/icons/Star';


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

function RestaurantesDetails() {
  const classes = useStyles();

  const [nome, setNome] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [distancia, setDistancia] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [imagem, setImagem] = useState([]);
  const [nota, setNota] = useState([]);
  const [tempoMedio, setTempoMedio] = useState([]);
  const [valorEntrega, setValorEntrega] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardapio, setCardapio] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    getCardapio(id).then((response) => {
      setNome(response.data.nome)
      setDescricao(response.data.descricao);
      setDistancia(response.data.distancia);
      setEndereco(response.data.endereco);
      setImagem(response.data.imagem);
      setNota(response.data.nota);
      setTempoMedio(response.data.tempoMedio);
      setValorEntrega(response.data.valorEntrega);
      setLoading(false);
    })
    axios.get(`https://itc-fvg-default-rtdb.firebaseio.com/detalhes/${id}.json`).then(data => { setCardapio(data.data.cardapio); console.log(data.data.cardapio); })
  }, []);

  return (
    <Container className="restaurantes">
      <Card className="card">
        <CardActionArea className="card-action">
          <CardContent className="card-content">
            <Typography variant="h5" className="title">{nome}</Typography>
            <Typography variant="h5" className="title">{distancia} km</Typography>
            <Typography variant="h5" className="title"><StarIcon /> {nota}</Typography>
            <Typography variant="h5" className="title">{tempoMedio} min - {valorEntrega}</Typography>
            <Typography variant="h5" className="title">{descricao}</Typography>
            <Typography variant="h5" className="title">{endereco}</Typography>
            <CardMedia><img src={imagem} /></CardMedia>
          </CardContent>
        </CardActionArea>
      </Card>

      {cardapio && cardapio.map((item, i) => (
        <Box key={i}>
          <Typography variant="body1" className={`${classes.cardapioTitle}`}>
            {item.categoria}
          </Typography>
          <Cardapio cardapio={item}></Cardapio>
        </Box>
      ))}

    </Container>
  )

}


export default RestaurantesDetails;