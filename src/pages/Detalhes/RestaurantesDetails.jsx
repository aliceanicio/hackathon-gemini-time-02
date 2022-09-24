import { Container, Typography, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantes } from "../../services/restaurantes.service";
import "./style.css";

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
  const { id } = useParams();

  useEffect(() => {
    getRestaurantes().then((response) => {
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
    <Container class="restaurantes">
      <Typography variant="h5" align="center" color="primary" className="title">
        {nome}
      </Typography>
      <Typography variant="h5" align="center" color="primary" className="title">
        {nome}
      </Typography>


    </Container>
  )

}


export default RestaurantesDetails;