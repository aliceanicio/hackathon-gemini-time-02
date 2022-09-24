import Api from "./api";

export function getCardapio (id) {
  try {
    const cardapio = Api.get(`/detalhes/${id}.json`);
    return cardapio;
  } catch (err) {
    throw err;
  }
};