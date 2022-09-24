import { Container, Typography, CircularProgress, makeStyles, Box, TextField, InputAdornment } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cardapio from "../../components/Cardapio";
import RestauranteCard from "../../components/RestauranteCard/RestauranteCard";
import { getCardapio } from "../../services/cardapio.service";
import { getRestaurantes } from "../../services/restaurantes.service";
import "./style.css";
import SearchIcon from '@material-ui/icons/Search';
import { ListAlt } from "@material-ui/icons";

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
  },
  input: {
    marginTop: 20,
    marginBottom: 20
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
  const [filteredCardapio, setFilteredCardapio] = useState([])

  const [search, setSearch] = useState('');

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
      setCardapio(response.data.cardapio)
      setFilteredCardapio(response.data.cardapio)
    })
  }, []);

  useEffect(() => {
    let lista = []
    if (search !== '') {
      filteredCardapio.map((categoria) => {
        categoria.itens = categoria.itens.filter(item => item.nome.toUpperCase().startsWith(search.toUpperCase()))
        lista.push(categoria)
      })
      setFilteredCardapio(lista)
    }
    else {
      getCardapio(id).then((response) => {
        setFilteredCardapio(response.data.cardapio)
      })
    }
  }, [search])

  return (

    <Container className="restaurantes">


      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className={classes.input}
        onChange={(e) => setSearch(e.target.value)}
        label="Buscar no cardápio"
        variant='outlined'
        fullWidth
      />

      {filteredCardapio && filteredCardapio.map((item, i) => (
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