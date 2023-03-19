function miniCardHtml(i, currentPokemon) {
    return (
        `
        <div onclick="openPokemonCard(${i})" id="poke-${i}" class="poke-card-small">
        <div class="space-between">
            <h3 id="poke-${i}-name">${currentPokemon['name']}</h3>
            <p>#${currentPokemon['id']}</p>
        </div>
        <div class="space-between">
            <div class="types">
                ${renderTypes(i, currentPokemon)}
            </div>
            <img id="poke-${i}-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
        </div>
        `
    );
}


function bigCardHtml(i, currentPokemon) {
    return (
        `
        <div id="poke-card-big-${i}" class="poke-card-big-bg">
        <div class="d-flex justify-content-between align-items-center">
            <img onclick="closePokemonCard()" class="icons" src="img/arrow-left.png">
            <img class="icons" src="img/star-empty.png">
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <h2>${currentPokemon['name']}</h2>
            <h4 id="poke-card-big-id">#${currentPokemon['id']}</h4>
        </div>
        <div id="poke-card-big-types" class="types-big d-flex">
            ${renderTypes(i, currentPokemon)}
        </div>
        <div>
            <img id="poke-card-big-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
    </div>

    <div class="poke-card-big-content">
        <div class="poke-card-big-menu d-flex justify-content-between">
            <div class="poke-card-big-menu-item" id="about" onclick="loadMenuContent('about')">About</div>
            <div class="poke-card-big-menu-item" id="base-stats" onclick="loadMenuContent('base-stats')">Base Stats</div>
            <div class="poke-card-big-menu-item" id="evolution" onclick="loadMenuContent('evolution')">Evolution</div>
            <div class="poke-card-big-menu-item" id="moves" onclick="loadMenuContent('moves')">Moves</div>
        </div>

        <div class="content-about">
            <table>
                <tbody>
                    <tr>
                        <td>Height</td>
                        <td>${currentPokemon['height'] * 10}cm</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>${(currentPokemon['weight'] / 10).toFixed(1)}kg</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td>
                            ${currentPokemon['abilities'][0]['ability']['name']},
                            ${currentPokemon['abilities'][1]['ability']['name']}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="content-base-stats">

        </div>

        <div class="content-evolution">

        </div>

        <div class="content-moves">

        </div>
        `
    );
}

// function loadMenuContent(){
//     return (

//     );
// }


function bigCardMenuItemsHtml(i, currentPokemon) {

}


function renderTypes(i, currentPokemon) {
    if (currentPokemon['types'].length == 1) {
        return (
            `                
            <div id="first-type-${i}">${currentPokemon['types'][0]['type']['name']}</div>
            `
        );
    } else {
        return (
            `                
            <div id="first-type-${i}">${currentPokemon['types'][0]['type']['name']}</div>
            <div id="second-type-${i}">${currentPokemon['types'][1]['type']['name']}</div>

            `
        );
    }
}