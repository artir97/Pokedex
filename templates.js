function miniCardHtml(i, currentPokemon) {
    return (
        `
        <div id="poke-${i}" class="poke-card-small">
        <h3 id="poke-${i}-name">${currentPokemon['name']}</h3>
        <div class="flex">
            <div class="types">
                ${renderTypes(i, currentPokemon)}
            </div>
            <img id="poke-${i}-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
        </div>
        `
    );
}

function renderTypes(i, currentPokemon){
    if(currentPokemon['types'].length == 1){
        return (
            `                
            <div id="first-type-${i}">${currentPokemon['types'][0]['type']['name']}</div>
            `
        );
    }else{
        return (
            `                
            <div id="first-type-${i}">${currentPokemon['types'][0]['type']['name']}</div>
            <div id="second-type-${i}">${currentPokemon['types'][1]['type']['name']}</div>

            `
        );
    }
}