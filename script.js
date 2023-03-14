
let pokemon = [];
let currentPokemon;

async function loadPokemon(){
for(let i = 0; i < 9; i++){
    let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
    let response = await fetch(url);
    currentPokemon = await response.json();   
    
    pokemon.push(currentPokemon);
}
console.log(pokemon);

renderAllPokemon();
}


function renderAllPokemon(){
    for (let i = 0; i < pokemon.length; i++) {
        const currentPokemon = pokemon[i];
        
        document.getElementById('all-pokemon').innerHTML += 
        `
        <div id="poke-${i}" class="poke-card-small">
        <h3 id="poke-${i}-name">${currentPokemon['name']}</h3>
        <div class="flex">
            <div class="types">
                <div>type1</div>
                <div>type2</div>
            </div>
            <img id="poke-${i}-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
        </div>
        `;
    }
}