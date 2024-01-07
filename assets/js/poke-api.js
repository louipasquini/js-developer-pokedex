const PokeApi = {

}

let pokemonsLists = {}

const convertPokeApi = (pokeDetail) => {
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const pokemon = new Pokemon(pokeDetail.id,
        pokeDetail.name,
        type,
        types,
        pokeDetail.stats[0].base_stat,
        pokeDetail.stats[5].base_stat,
        pokeDetail.stats[1].base_stat,
        pokeDetail.stats[2].base_stat,
        pokeDetail.stats[3].base_stat,
        pokeDetail.stats[4].base_stat)
    
    pokemonsLists[pokeDetail.name] = pokemon

    return pokemon
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((res) => res.json())
        .then(convertPokeApi)
}

PokeApi.getPokemons = (offset = 0, limit = 151) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((res) => res.json())
        .then((response) => response.results)
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}
