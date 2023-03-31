
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
}


async function openPokemonCard(i) {
    let currentPokemon = await loadCurrentPokemonBigCard(i);
    let { colorCard, colorType } = getColors(currentPokemon);

    createBigPokemonCard(i, currentPokemon);
    addColors(i, colorCard, colorType, currentPokemon);
    hideButtonFirstPokemon(currentPokemon);
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
}


function renderBackgrounds(i, currentPokemon) {
    let { currentPokemonId, currentBackground, currentFirstTypeId, currentBackgroundType, currentSecondTypeId }
        = initVariablesRenderBackgrounds(currentPokemon, i);

    currentPokemonId.style = 'background-color:' + currentBackground;
    currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
    if (currentPokemon['types'].length > 1) {
        currentSecondTypeId.style = 'background-color:' + currentBackgroundType;
    }
}


// BIG POKEMON CARD
function createBigPokemonCard(i, currentPokemon) {
    document.getElementById('poke-card-big').innerHTML = bigCardHtml(i, currentPokemon);
    document.querySelector('.poke-card-big').classList.remove('d-none');
}


function hideButtonFirstPokemon(currentPokemon){
    let leftBtn = document.getElementById('previous-pokemon');
    let leftBtnInCard = document.querySelector('.in-card-btn-left');

    if(currentPokemon.id == 1){
        leftBtn.classList.add('d-none');
        leftBtnInCard.classList.add('d-none');
    }
}


function addColors(i, colorCard, colorType, currentPokemon) {
    document.getElementById(`poke-card-big-${i}`).style = 'background-color:' + colorCard;

    document.getElementById(`first-type-big-${i}`).style = 'background-color:' + colorType;
    if (currentPokemon['types'].length > 1) {
        document.getElementById(`second-type-big-${i}`).style = 'background-color:' + colorType;
    }
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
    } else if (menu == 'moves') {
        menuContent.innerHTML = menuContentMovesHtml(currentPokemon);
    }
}


function closePokemonCard() {
    document.querySelector('.poke-card-big').classList.add('d-none');
}


// GENERAL FUNCTIONS ==============================================================================
function openBurgerMenu() {
    let burgerMenuBtnClasses = document.getElementById('search-form').classList;

    if (burgerMenuBtnClasses.contains('d-none-mobile')) {
        burgerMenuBtnClasses.remove('d-none-mobile');
    } else {
        burgerMenuBtnClasses.add('d-none-mobile');
    }
}


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
    renderBackgrounds();
    loadAllPokemon();
}
