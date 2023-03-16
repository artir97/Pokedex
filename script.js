
let pokemon = [];
let allPokemonUrls = [];
let currentPokemon;

let urlAllPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0';

async function loadAllPokemon() {
    let response = await fetch(urlAllPokemon);
    response = await response.json();
    return response;
}


async function saveallPokemonUrls() {
    let response = await fetch(urlAllPokemon);
    response = await response.json();

    for (let i = 0; i < response['count']; i++) {
        allPokemonUrls.push(response.results[i].url);
    }
}
saveallPokemonUrls();


async function loadPokemon(){
    for(let i = 0; i < 30; i++){
        let url = allPokemonUrls[i];
        let response = await fetch(url);
        currentPokemon = await response.json();

        pokemon.push(currentPokemon);
        
        document.getElementById('all-pokemon').innerHTML += miniCardHtml(i, currentPokemon);
        renderBackgrounds(i, currentPokemon);
        renderBackgroundsType(i, currentPokemon);
    }
    // renderAllPokemon();
    // renderBackgroundsType();
}


function renderBackgroundsType(i, currentPokemon) {
    let currentPokemonType = currentPokemon['types'][0]['type']['name'];
    let currentFirstTypeId = document.getElementById(`first-type-${i}`);
    let currentSecondTypeId = document.getElementById(`second-type-${i}`);
    let currentBackgroundType = colors[0][currentPokemonType][1];

        if (pokemon[i]['types'].length == 1) {
            currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
        } else {
            currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
            currentSecondTypeId.style = 'background-color:' + currentBackgroundType;
        }
}


function renderBackgrounds(i, currentPokemon) {
    let currentPokemonType = currentPokemon['types'][0]['type']['name'];
    let currentBackground = colors[0][currentPokemonType][0];
    let currentPokemonId = document.getElementById(`poke-${i}`);

    currentPokemonId.style = 'background-color:' + currentBackground;
}


// function renderBackgrounds() {
//     let currentPokemonType;
//     let currentBackground;
//     let currentPokemonId;
//     for (let i = 0; i < pokemon.length; i++) {
//         currentPokemonType = pokemon[i]['types'][0]['type']['name'];
//         currentBackground = colors[0][currentPokemonType][0];
//         currentPokemonId = document.getElementById(`poke-${i}`);

//         currentPokemonId.style = 'background-color:' + currentBackground;
//     }

// }



// function renderAllPokemon() {
//     for (let i = 0; i < pokemon.length; i++) {
//         const currentPokemon = pokemon[i];

//         document.getElementById('all-pokemon').innerHTML += miniCardHtml(i, currentPokemon);

//     }
// }




function searchPokemon() {
    let search = document.getElementById('poke-search').value;
    search = search.toLowerCase();

    let pokemonShown = document.getElementById('all-pokemon');
    pokemonShown.innerHTML = '';

    for (let i = 0; i < pokemon.length; i++) {
        let currentPokemon = pokemon[i];
        if (currentPokemon.name.toLowerCase().includes(search)) {
            pokemonShown.innerHTML += miniCardHtml(i, currentPokemon);
        }
    }
}



// async function loadPokemon() {
//     for (let i = 0; i < 30; i++) {
//         let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
//         let response = await fetch(url);
//         currentPokemon = await response.json();

//         pokemon.push(currentPokemon);
//     }
//     renderAll();
// }






async function searchThroughAllPokemon() {
    let search = document.getElementById('poke-search').value;
    let allPokemon = await loadAllPokemon();
    search = search.toLowerCase();

    for (let i = 0; i < allPokemon.count; i++) {
        let currentPokemon = allPokemon.results[i];
        if (currentPokemon.name.toLowerCase().includes(search)) {
            console.log(currentPokemon);
        }

    }

    console.log(allPokemon);
}


function renderAll() {
    renderAllPokemon();
    renderBackgroundsType();
    renderBackgrounds();
    loadAllPokemon();
}