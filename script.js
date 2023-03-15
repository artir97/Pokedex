
let pokemon = [];
let currentPokemon;

async function loadPokemon() {
    for (let i = 0; i < 34; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        pokemon.push(currentPokemon);
    }
    console.log(pokemon);

    renderAllPokemon();
    renderBackgroundsType();
    renderBackgrounds();
}


function renderAllPokemon() {
    for (let i = 0; i < pokemon.length; i++) {
        const currentPokemon = pokemon[i];

        document.getElementById('all-pokemon').innerHTML += miniCardHtml(i, currentPokemon);

    }
}


function renderBackgrounds() {
    let currentPokemonType;
    let currentBackground;
    let currentPokemonId;
    for (let i = 0; i < pokemon.length; i++) {
        currentPokemonType = pokemon[i]['types'][0]['type']['name'];
        currentBackground = colors[0][currentPokemonType][0];
        currentPokemonId = document.getElementById(`poke-${i}`);

        currentPokemonId.style = 'background-color:' + currentBackground;
    }

}


function renderBackgroundsType() {
    let currentPokemonType;
    let currentFirstTypeId;
    let currentSecondTypeId;
    let currentBackgroundType;

    for (let i = 0; i < pokemon.length; i++) {
        currentPokemonType = pokemon[i]['types'][0]['type']['name'];
        currentFirstTypeId = document.getElementById(`first-type-${i}`);
        currentSecondTypeId = document.getElementById(`second-type-${i}`);
        currentBackgroundType = colors[0][currentPokemonType][1];

        if (pokemon[i]['types'].length == 1) {
            currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
        } else {
            currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
            currentSecondTypeId.style = 'background-color:' + currentBackgroundType;
        }
    }
}


function searchPokemon(){
    let search = document.getElementById('poke-search').value;
    search = search.toLowerCase();

    let pokemonShown = document.getElementById('all-pokemon');
    pokemonShown.innerHTML = '';

    for(let i = 0; i < pokemon.length; i++){
        let currentPokemon = pokemon[i];
        if(currentPokemon.name.toLowerCase().includes(search)){ 
            pokemonShown.innerHTML += miniCardHtml(i, currentPokemon);
        }
    }

}