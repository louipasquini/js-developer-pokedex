// const convertTypes = (pokemonTypes) => {
//     return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type}</li>`)
// }

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

let offset = 0
let limit = 151

const convertPokemon = (pokemon) => {
    let num = pokemon.num.toString()
    return `
    <li class="pokemon ${pokemon.type}" id="${pokemon.name}"  onclick="findId(event)">
            <div class="title" id="${pokemon.name}">
                <span class="name" id="${pokemon.name}">${pokemon.name}</span>
                <span class="number" id="${pokemon.name}">#${num.padStart(3,'0')}</span>
            </div>
            <div class="detail" id="${pokemon.name}">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class='type'>${type}</li>`).join('')}
                </ol>
                <img src="assets/img/pokemons/poke_${num}.gif" alt="${pokemon.name}" id="${pokemon.name}">
            </div>
        </li>
    `
}

const createStats = (pokemon) => {
    return `
    <div class="pokemonStats ${pokemon.type}" id="${pokemon.name + 'stat'}" onclick="closeStats(event)">
        <h1>${pokemon.name}</h1>
        <ol class="types">
            ${pokemon.types.map((type) => `<li class='type'>${type}</li>`).join('')}
        </ol>
        <img class="pokeIcon" src="assets/img/pokemons/poke_${pokemon.num}.gif" alt="${pokemon.name}">
        <img class="pokeball" src="assets/img/pokeball.png" alt="pokeball">
        <div class="stats">
            <div>
                <h3>HP</h3>
                <h4>${pokemon.hp}</h4>
            </div>
            <div>
                <h3>Speed</h3>
                <h4>${pokemon.speed}</h4>
            </div>
            <div>
                <h3>Attack</h3>
                <h4>${pokemon.attack}</h4>
            </div>
            <div>
                <h3>Defense</h3>
                <h4>${pokemon.defense}</h4>
            </div>
            <div>
                <h3>Special Attack</h3>
                <h4>${pokemon.sa}</h4>
            </div>
            <div>
                <h3>Special Defense</h3>
                <h4>${pokemon.sd}</h4>
            </div>
        </div>
    </div>
    `
}

const showStats = (id) => {
    pokemonList.innerHTML += createStats(pokemonsLists[id])
}

const findId = (event) => {
    showStats(event.target.id)
}

const closeStats = (event) => {
    let idElement = event.target.id
    console.log(idElement)
    let element = document.getElementById(idElement)
    let paiElement = element.parentNode
    paiElement.removeChild(element)
}

const loadMore = (offset, limit) => {
    PokeApi.getPokemons(offset, limit).then((pokemons) => {
        pokemonList.innerHTML = pokemons.map(convertPokemon).join('')
    })
}

loadMore(offset, limit)

loadMoreButton.addEventListener('click' , () => {
    limit = limit * 2
    loadMore(offset, limit)
})

