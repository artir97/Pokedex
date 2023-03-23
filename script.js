
let pokemon = [];
let allPokemonUrls = [];
let currentPokemon;
let pokemonToLoad = 50;

let urlAllPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0';


// LOAD POKEMON ==============================================================================
async function loadAllPokemon() {
    let response = await fetch(urlAllPokemon);
    response = await response.json();
    return response;
}


async function loadAllPokemonUrls() {
    let response = await loadAllPokemon();
    for (let i = 0; i < response['count']; i++) {
        allPokemonUrls.push(response.results[i].url);
    }
}


async function loadPokemon() {
    document.getElementById('load-more-pokemon-btn').classList.add('d-none');
    await loadAllPokemonUrls();
    for (let i = 0; i < pokemonToLoad; i++) {
        await loadOnePokemon(i);
    }
    document.getElementById('load-more-pokemon-btn').classList.remove('d-none');

}


async function loadMorePokemon() {
    document.getElementById('load-more-pokemon-btn').classList.add('d-none');
    for (let i = pokemonToLoad; i < pokemonToLoad + 20; i++) {
        await loadOnePokemon(i);
    }
    pokemonToLoad += 20;

    document.getElementById('load-more-pokemon-btn').classList.remove('d-none');
}


async function loadOnePokemon(i) {
    let url = allPokemonUrls[i];
    let response = await fetch(url);
    currentPokemon = await response.json();

    pokemon.push(currentPokemon);
    showMiniCards(i);
}


async function loadCurrentPokemonBigCard(i) {
    let currentPokemon = await fetch(allPokemonUrls[i]);
    currentPokemon = await currentPokemon.json();
    return currentPokemon;
}


function loadPreviousPokemon(i) {
    openPokemonCard(i - 1);
}


function loadNextPokemon(i) {
    openPokemonCard(i + 1)
}


// SEARCH POKEMON ==============================================================================
async function searchThroughAllPokemon() {
    let search = returnSearch();
    let pokemonShown = document.getElementById('all-pokemon');
    let allPokemon = await loadAllPokemon();
    await showApiSearchedPokemon(search, pokemonShown, allPokemon);
}


function searchThroughPokemon() {
    let search = returnSearch();
    let pokemonShown = document.getElementById('all-pokemon');
    showLocalSearchedPokemon(search, pokemonShown);
}


function returnSearch() {
    let search = document.getElementById('poke-search').value;
    search = search.toLowerCase();
    return search
}


// SHOW POKEMON ==============================================================================
function showMiniCards(i) {
    document.getElementById('all-pokemon').innerHTML += miniCardHtml(i, currentPokemon);
    renderBackgrounds(i, currentPokemon);
    renderBackgroundsType(i, currentPokemon);
}


async function openPokemonCard(i) {
    let currentPokemon = await loadCurrentPokemonBigCard(i);
    let { colorCard, colorType } = getColors(currentPokemon);

    createBigPokemonCard(i, currentPokemon);
    addColors(i, colorCard, colorType, currentPokemon);
}


function searchThroughPokemonArray(pokemonShown, search) {
    pokemonShown.innerHTML = '';
    document.getElementById('load-btn-div').style = 'display: none';
    for (let i = 0; i < pokemon.length; i++) {
        let currentPokemon = pokemon[i];
        if (currentPokemon.name.toLowerCase().includes(search)) {
            createAndShowSearchedMiniCards(pokemonShown, i, currentPokemon);
        }
    }
}


function showLocalSearchedPokemon(search, pokemonShown) {
    if (search.trim() == '') {
        alert('No empty search allowed');
    } else {
        searchThroughPokemonArray(pokemonShown, search);
    }
}


async function showApiSearchedPokemon(search, pokemonShown, allPokemon) {
    if (search.trim() == '') {
        alert('No empty search allowed');
    } else {
        await searchThroughApi(pokemonShown, allPokemon, search);
    }
}


async function searchThroughApi(pokemonShown, allPokemon, search) {
    pokemonShown.innerHTML = '';
    document.getElementById('load-btn-div').style = 'display: none';

    for (let i = 0; i < allPokemon.count; i++) {
        let currentPokemon = allPokemon.results[i];
        if (currentPokemon.name.toLowerCase().includes(search)) {
            let response = await fetch(currentPokemon['url']);
            currentPokemon = await response.json();

            createAndShowSearchedMiniCards(pokemonShown, i, currentPokemon);
        }
    }
}


function createAndShowSearchedMiniCards(pokemonShown, i, currentPokemon) {
    pokemonShown.innerHTML += miniCardHtml(i, currentPokemon);
    renderBackgrounds(i, currentPokemon);
    renderBackgroundsType(i, currentPokemon);
}


function renderBackgrounds(i, currentPokemon) {
    let { currentPokemonId, currentBackground } = initVariablesRenderBackgrounds(currentPokemon, i);

    currentPokemonId.style = 'background-color:' + currentBackground;
}

function renderBackgroundsType(i, currentPokemon) {
    let { currentFirstTypeId, currentBackgroundType, currentSecondTypeId } = initVariablesRenderBackgroundsType(currentPokemon, i);

    currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
    if (currentPokemon['types'].length > 1) {
        currentSecondTypeId.style = 'background-color:' + currentBackgroundType;
    }
}


function initVariablesRenderBackgrounds(currentPokemon, i) {
    let currentPokemonType = currentPokemon['types'][0]['type']['name'];
    let currentBackground = colors[0][currentPokemonType][0];
    let currentPokemonId = document.getElementById(`poke-${i}`);
    return { currentPokemonId, currentBackground };
}


function initVariablesRenderBackgroundsType(currentPokemon, i) {
    let currentPokemonType = currentPokemon['types'][0]['type']['name'];
    let currentFirstTypeId = document.getElementById(`first-type-${i}`);
    let currentSecondTypeId = document.getElementById(`second-type-${i}`);
    let currentBackgroundType = colors[0][currentPokemonType][1];
    return { currentFirstTypeId, currentBackgroundType, currentSecondTypeId };
}



function createBigPokemonCard(i, currentPokemon) {
    document.getElementById('poke-card-big').innerHTML = bigCardHtml(i, currentPokemon);
    document.querySelector('.poke-card-big').classList.remove('d-none');
}


function addColors(i, colorCard, colorType, currentPokemon) {
    document.getElementById(`poke-card-big-${i}`).style = 'background-color:' + colorCard;
    
    document.getElementById(`first-type-big-${i}`).style = 'background-color:' + colorType;
    if (currentPokemon['types'].length > 1) {
        document.getElementById(`second-type-big-${i}`).style = 'background-color:' + colorType;
    }
}


function getColors(currentPokemon) {
    let colorCard = colors[0][currentPokemon['types'][0]['type']['name']][0];
    let colorType = colors[0][currentPokemon['types'][0]['type']['name']][1];
    return { colorCard, colorType };
}


async function loadMenuContent(i, menu) {
    let currentPokemon = await loadCurrentPokemonBigCard(i);
    let menuContent = document.getElementById('poke-card-big-content');

    returnMenuContent(menu, menuContent, currentPokemon);
}


function returnMenuContent(menu, menuContent, currentPokemon) {
    if (menu == 'about') {
        menuContent.innerHTML = menuContentAboutHtml(currentPokemon);
    } else if (menu == 'base-stats') {
        menuContent.innerHTML = menuContentBaseStatsHtml(currentPokemon);
    } else if (menu == 'evolution') {
        menuContent.innerHTML = menuContentEvolutionHtml(currentPokemon);
    } else if (menu == 'moves') {
        menuContent.innerHTML = menuContentMovesHtml(currentPokemon);
    }
}


function closePokemonCard() {
    document.querySelector('.poke-card-big').classList.add('d-none');
}


// GENERAL FUNCTIONS ==============================================================================
function pokeIdNr(i) {
    let str = i.toString();
    while (str.length < 4) str = "0" + str;
    return str;
}


function comingSoon() {
    alert('This functionality doesn\'t exist yet - it will be available soon');
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function renderAll() {
    renderAllPokemon();
    renderBackgroundsType();
    renderBackgrounds();
    loadAllPokemon();
}
