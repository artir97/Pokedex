
let currentPokemon;

async function loadPokemon(){
 let url = 'https://pokeapi.co/api/v2/pokemon/1';
 let response = await fetch(url);
 currentPokemon = await response.json();   

 console.log(currentPokemon);

 renderPokemonInfo();
}


function renderPokemonInfo(){
    document.getElementById('poke-1-name').innerHTML = currentPokemon['name'];
    document.getElementById('poke-1-img').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}