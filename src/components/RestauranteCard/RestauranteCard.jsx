import React from "react";
import Card from "@material-ui/core/Card";
import StarIcon from '@material-ui/icons/Star';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./styles.css";
import { Box } from "@material-ui/core";

export default function RestauranteCard(props) {

    return (
        <Card className="restauranteCard">
            <CardActionArea className="cardArea">
                <CardMedia className="imagem"
                    component="img"
                    image={props.restaurante.imagem}
                    title="Contemplative Reptile"
                />
                <CardContent className="conteudo">
                    <Typography gutterBottom variant="h4" component="h2">
                        {props.restaurante.nome}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.restaurante.distancia} Km
                    </Typography>
                    <Box display="flex" className="div-rating">
                        <StarIcon color="primary" style={{ fontSize: 14 }} />
                        <Typography gutterBottom variant="h6" component="h2">
                            {props.restaurante.nota}
                        </Typography>
                    </Box>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.restaurante.tempo_medio}
                    </Typography>
                    {props.restaurante.valor_entrega ?
                        <Typography gutterBottom variant="h5" component="h2">
                            R$ {props.restaurante.valor_entrega},00
                        </Typography>
                        :
                        <Typography gutterBottom variant="h5" component="h2">
                            Gratis
                        </Typography>}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}