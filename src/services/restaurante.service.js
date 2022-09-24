import api from "./api";

export function getDetalhes(id) {

    try {
        const detalhes = api.get(`/detalhes/${id}.json`);
        return detalhes.data;
    } catch(err) {
        throw(err)
    }
}