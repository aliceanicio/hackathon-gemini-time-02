import { Container, Typography, CircularProgress, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cardapio from "../../components/Cardapio";
import { getCardapio } from "../../services/cardapio.service";
import { getRestaurantes } from "../../services/restaurantes.service";
import "./style.css";

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
      console.log(response);
      setNome(response.nome)
      setDescricao(response.descricao);
      setDistancia(response.distancia);
      setEndereco(response.endereco);
      setImagem(response.imagem);
      setNota(response.nota);
      setTempoMedio(response.tempoMedio);
      setValorEntrega(response.valorEntrega);
      setLoading(false);
    })
  }, []);

  return (
    <Container className="restaurantes">
      <Typography variant="h5" align="center" color="primary" className="title">
        {nome}
      </Typography>
      <Typography variant="h5" align="center" color="primary" className="title">
        {nome}
      </Typography>

      {cardapio && cardapio.map((item, i) => (
        <Cardapio key={i} cardapio={item}></Cardapio>
      ))}

    </Container>
  )

}


export default RestaurantesDetails;