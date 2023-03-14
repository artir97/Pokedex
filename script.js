
let pokemon = [];
let currentPokemon;

async function loadPokemon(){
for(let i = 0; i < 99; i++){
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
    for (let i = 0; i < pokemon.length; i++) {

        if(pokemon[i]['types'][0]['type']['name'] == 'grass'){
            document.getElementById(`poke-${i}`).style = `background-color: ${colors[0]['grass'][0]}`;
        }else if(pokemon[i]['types'][0]['type']['name'] == 'fire'){
            document.getElementById(`poke-${i}`).style = `background-color: ${colors[0]['fire'][0]}`;
        }else if(pokemon[i]['types'][0]['type']['name'] == 'water'){
            document.getElementById(`poke-${i}`).style = `background-color: ${colors[0]['water'][0]}`;
        }
    }

}


function renderBackgroundsType(){
    for (let i = 0; i < pokemon.length; i++) {
        if(pokemon[i]['types'][0]['type']['name'] == 'grass'){
            document.getElementById(`first-type-${i}`).style = `background-color: ${colors[0]['grass'][1]}`;
            document.getElementById(`second-type-${i}`).style = `background-color: ${colors[0]['grass'][1]}`;
        }else if(pokemon[i]['types'][0]['type']['name'] == 'fire'){
            document.getElementById(`first-type-${i}`).style = `background-color: ${colors[0]['fire'][1]}`;
            document.getElementById(`second-type-${i}`).style = `background-color: ${colors[0]['fire'][1]}`;
        }else if(pokemon[i]['types'][0]['type']['name'] == 'water'){
            document.getElementById(`first-type-${i}`).style = `background-color: ${colors[0]['water'][1]}`;
            document.getElementById(`second-type-${i}`).style = `background-color: ${colors[0]['water'][1]}`;
        }
    }
}