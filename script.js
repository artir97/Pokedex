
let pokemon = [];
let currentPokemon;

async function loadPokemon(){
for(let i = 0; i < 150; i++){
    let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
    let response = await fetch(url);
    currentPokemon = await response.json();   
    
    pokemon.push(currentPokemon);
}
console.log(pokemon);

renderAllPokemon();
renderBackgroundsType();
renderBackgrounds();
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
                <div id="first-type-${i}">type1</div>
                <div id="second-type-${i}">type2</div>
            </div>
            <img id="poke-${i}-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
        </div>
        `;
    }
}


function renderBackgrounds(){
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


function renderBackgroundsType(){
    let currentPokemonType;
    let currentFirstTypeId; 
    let currentSecondTypeId;
    let currentBackgroundType;
    
    for(let i = 0; i < pokemon.length; i++){
        currentPokemonType = pokemon[i]['types'][0]['type']['name']; 
        currentFirstTypeId = document.getElementById(`first-type-${i}`);  
        currentSecondTypeId = document.getElementById(`second-type-${i}`);
        currentBackgroundType = colors[0][currentPokemonType][1];

        currentFirstTypeId.style = 'background-color:' + currentBackgroundType;
        currentSecondTypeId.style = 'background-color:' + currentBackgroundType;

    }
}