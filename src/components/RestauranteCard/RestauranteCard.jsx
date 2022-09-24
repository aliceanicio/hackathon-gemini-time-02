import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./styles.css";

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
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.restaurante.nome}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.restaurante.distancia} Km
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.restaurante.nota}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.restaurante.tempo_medio}
                    </Typography>
                    {props.restaurante.valor_entrega?
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