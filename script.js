
let pokemon = [];
let allPokemonUrls = [];
let currentPokemon;
let pokemonToLoad = 30;

let urlAllPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0';

async function loadAllPokemon() {
    let response = await fetch(urlAllPokemon);
    response = await response.json();
    return response;
}


async function loadAllPokemonUrls() {
    let response = await fetch(urlAllPokemon);
    response = await response.json();

    for (let i = 0; i < response['count']; i++) {
        allPokemonUrls.push(response.results[i].url);
    }
}
loadAllPokemonUrls();


async function loadPokemon(){
    
    for(let i = 0; i < pokemonToLoad; i++){
        let url = allPokemonUrls[i];
        let response = await fetch(url);
        currentPokemon = await response.json();

        pokemon.push(currentPokemon);
        
        document.getElementById('all-pokemon').innerHTML += miniCardHtml(i, currentPokemon);
        renderBackgrounds(i, currentPokemon);
        renderBackgroundsType(i, currentPokemon);
    }
}


async function loadMorePokemon(){
    for(let i = pokemonToLoad; i < pokemonToLoad+20; i++){
        let url = allPokemonUrls[i];
        let response = await fetch(url);
        currentPokemon = await response.json();

        pokemon.push(currentPokemon);

        document.getElementById('all-pokemon').innerHTML += miniCardHtml(i, currentPokemon);
        renderBackgrounds(i, currentPokemon);
        renderBackgroundsType(i, currentPokemon);
    }
    pokemonToLoad += 20;
}


async function searchThroughAllPokemon() {
    let search = document.getElementById('poke-search').value;
    search = search.toLowerCase();
    
    let pokemonShown = document.getElementById('all-pokemon');
    pokemonShown.innerHTML = '';

    let allPokemon = await loadAllPokemon();

    for (let i = 0; i < allPokemon.count; i++) {
        let currentPokemon = allPokemon.results[i];
        if (currentPokemon.name.toLowerCase().includes(search)) {
            let response = await fetch(currentPokemon['url']);
            currentPokemon = await response.json(),
            pokemonShown.innerHTML += miniCardHtml(i, currentPokemon);
            renderBackgrounds(i, currentPokemon);
            renderBackgroundsType(i, currentPokemon);
        }

    }

    console.log(allPokemon);
}


function searchPokemon() {
    let search = document.getElementById('poke-search').value;
    search = search.toLowerCase();

    let pokemonShown = document.getElementById('all-pokemon');
    pokemonShown.innerHTML = '';

    for (let i = 0; i < pokemon.length; i++) {
        let currentPokemon = pokemon[i];
        if (currentPokemon.name.toLowerCase().includes(search)) {
            pokemonShown.innerHTML += miniCardHtml(i, currentPokemon);
            renderBackgrounds(i, currentPokemon);
            renderBackgroundsType(i, currentPokemon);
        }
    }
}


function renderBackgrounds(i, currentPokemon) {
    let currentPokemonType = currentPokemon['types'][0]['type']['name'];
    let currentBackground = colors[0][currentPokemonType][0];
    let currentPokemonId = document.getElementById(`poke-${i}`);

    currentPokemonId.style = 'background-color:' + currentBackground;
}


function renderBackgroundsType(i, currentPokemon) {
    let currentPokemonType = currentPokemon['types'][0]['type']['name'];
    let currentFirstTypeId = document.getElementById(`first-type-${i}`);
    let currentSecondTypeId = document.getElementById(`second-type-${i}`);
    let currentBackgroundType = colors[0][currentPokemonType][1];

        if (currentPokemon['types'].length == 1) {
            currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
        } else {
            currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
            currentSecondTypeId.style = 'background-color:' + currentBackgroundType;
        }
}


async function openPokemonCard(i){
    let currentPokemon = await fetch(allPokemonUrls[i]);
    currentPokemon = await currentPokemon.json();
    
    console.log(currentPokemon);
    
    document.getElementById('poke-card-big-name').innerHTML = currentPokemon['name'];
    document.getElementById('poke-card-big-img').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    
    document.querySelector('.poke-card-big').classList.remove('d-none');
}


function renderAll() {
    renderAllPokemon();
    renderBackgroundsType();
    renderBackgrounds();
    loadAllPokemon();
}