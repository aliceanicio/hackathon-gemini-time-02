import { Container, Typography, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getRestaurantes } from "../../services/restaurantes.service";
import "./style.css";
import { Navigate, useParams } from "react-router-dom";
import RestauranteCard from "../../components/RestauranteCard/RestauranteCard";
import { useNavigate } from "react-router-dom"

function RestaurantesPage() {
  const [nomeCategoria, setNomeCategoria] = useState([]);
  const [restaurantesBaratinho, setRestaurantesBaratinho] = useState([]);
  const [restaurantesNoPreco, setRestaurantesNoPreco] = useState([]);
  const [restaurantesCaro, setRestaurantesCaro] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getRestaurantes().then((response) => {
      getRestaurantes(id).then((response) => {
        setNomeCategoria(response.categoria)
        setRestaurantesBaratinho(response.baratinho);
        setRestaurantesNoPreco(response.no_preco);
        setRestaurantesCaro(response.caro);
        setLoading(false);
      })
    }, []);
  }, [id]);

  function irParaDetalhe(id) {
    navigate(`/restaurantes/detalhes/${id}`)
  }

  return (
    <Container class="restaurantes">
      <Typography variant="h5" align="center" color="primary" className="title">
        RESTAURANTES: {nomeCategoria}
      </Typography>
      {loading && (
        <div className="loading">
          <CircularProgress color="primary" />
        </div>
      )}
      {restaurantesBaratinho && (
        <div className="sub-header">
          <Typography variant="body1" color="primary">
            Baratinho <span>(</span>$ <span>$ $ $ $)</span>
          </Typography>
        </div>
      )}
      {restaurantesBaratinho?.map(restaurante => (
        <div key={restaurante.id} onClick={() => irParaDetalhe(restaurante.id)}>
          {<RestauranteCard restaurante={restaurante} />}
        </div>
      ))}
      {restaurantesNoPreco && (
        <div className="sub-header">
          <Typography variant="body1" color="primary">
            No Pre??o <span>(</span>$ $ $ <span>$ $ )</span>
          </Typography>
        </div>
      )}
      {restaurantesNoPreco?.map(restaurante => (
        <div key={restaurante.id} onClick={() => irParaDetalhe(restaurante.id)}>
          {<RestauranteCard restaurante={restaurante} />}
        </div>
      ))}
      {restaurantesCaro && (
        <div className="sub-header">
          <Typography variant="body1" color="primary">
            Caro <span>(</span>$ $ $ $ $ <span>)</span>
          </Typography>
        </div>
      )}
      {restaurantesCaro?.map(restaurante => (
        <div key={restaurante.id} onClick={() => irParaDetalhe(restaurante.id)}>
          {<RestauranteCard restaurante={restaurante} />}
        </div>
      ))}
    </Container>
  )
}
export default RestaurantesPage;