function miniCardHtml(i, currentPokemon) {
    return (
        `
        <div onclick="openPokemonCard(${i})" id="poke-${i}" class="poke-card-small">
            <img class="poke-card-mini-bg" src="img/pokeball-bg-4.png">
            <div class="space-between">
                <h3 id="poke-${i}-name">${capitalizeFirstLetter(currentPokemon['name'])}</h3>
                <p>#${pokeIdNr(currentPokemon['id'])}</p>
            </div>
            <div class="space-between">
                <div class="types">
                    ${renderTypes(i, currentPokemon)}
                </div>
                <img class="poke-card-mini-pokemon-img" id="poke-${i}-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
            </div>
        </div>
        `
    );
}


function bigCardHtml(i, currentPokemon) {
    let color = colors[0][currentPokemon['types'][0]['type']['name']][0];
    return (
        `
        <button style="background-color:${color}" onclick="loadPreviousPokemon(${i})" id = "previous-pokemon"> < </button>
        <button style="background-color:${color}" onclick="loadNextPokemon(${i})" id = "next-pokemon"> > </button>

        <img class="poke-card-big-bg-img" src="img/pokeball-bg-4.png">

        <div id="poke-card-big-${i}" class="poke-card-big-bg">
        <div class="d-flex justify-content-between align-items-center">
            <img onclick="closePokemonCard()" class="icons" src="img/arrow-left.png">
            <img onclick="comingSoon()" class="icons" src="img/heart-empty.png">
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <h2>${capitalizeFirstLetter(currentPokemon['name'])}</h2>
            <h4 id="poke-card-big-id">#${pokeIdNr(currentPokemon['id'])}</h4>
        </div>
        <div id="poke-card-big-types" class="types-big d-flex">
            ${renderTypesBigCard(i, currentPokemon)}
        </div>
        <div>
            <img id="poke-card-big-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
    </div>

    <div class="poke-card-big-content">
        <div style="border-bottom: 3px solid ${color} ;" class="poke-card-big-menu d-flex justify-content-between">
            <div class="poke-card-big-menu-item" id="about" onclick="loadMenuContent(${i},'about')">About</div>
            <div class="poke-card-big-menu-item" id="base-stats" onclick="loadMenuContent(${i},'base-stats')">Base Stats</div>
            <div class="poke-card-big-menu-item" id="evolution" onclick="loadMenuContent(${i},'evolution')">Evolution</div>
            <div class="poke-card-big-menu-item" id="moves" onclick="loadMenuContent(${i},'moves')">Moves</div>
        </div>

        <div class="content-under-menu" id="poke-card-big-content">
            ${menuContentAboutHtml(currentPokemon)}
        </div>
    </div>
        `
    );
}

function menuContentAboutHtml(currentPokemon) {
    return (
        `
        <div>
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
                            ${renderAbilities(currentPokemon)}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        `
    );
}


function menuContentBaseStatsHtml(currentPokemon) {
    // TODO: only leave actual html in a template
    let maxPoints = 120;
    let maxPointsTotal = 720;

    let hpPercent = ((currentPokemon['stats'][0]['base_stat']) / maxPoints).toFixed(2) * 100;
    let atkPercent = ((currentPokemon['stats'][1]['base_stat']) / maxPoints).toFixed(2) * 100;
    let defPercent = ((currentPokemon['stats'][2]['base_stat']) / maxPoints).toFixed(2) * 100;
    let spAPercent = ((currentPokemon['stats'][3]['base_stat']) / maxPoints).toFixed(2) * 100;
    let spDPercent = ((currentPokemon['stats'][4]['base_stat']) / maxPoints).toFixed(2) * 100;
    let spdPercent = ((currentPokemon['stats'][5]['base_stat']) / maxPoints).toFixed(2) * 100;

    let totalPoints = (currentPokemon['stats'][0]['base_stat'] +
        currentPokemon['stats'][1]['base_stat'] +
        currentPokemon['stats'][2]['base_stat'] +
        currentPokemon['stats'][3]['base_stat'] +
        currentPokemon['stats'][4]['base_stat'] +
        currentPokemon['stats'][5]['base_stat']
    );
    let totalPercent = (totalPoints / maxPointsTotal).toFixed(2) * 100;

    console.log(hpPercent, atkPercent, defPercent, spAPercent, spDPercent, spdPercent);

    let colorBar = colors[0][currentPokemon['types'][0]['type']['name']][0];


    return (
        `   
        <table>
        <tbody>
            <tr>
                <td style="width: 10%;">HP</td>
                <td style="width: 5%;">${currentPokemon['stats'][0]['base_stat']}</td>
                <td>
                    <div class="progress my-2" role="progressbar">
                        <div id="hp-bar" class="progress-bar" style="width: ${hpPercent}%; background-color:${colorBar}"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 10%;">ATK</td>
                <td style="width: 5%;">${currentPokemon['stats'][1]['base_stat']}</td>
                <td>
                    <div class="progress my-2" role="progressbar">
                        <div id="atk-bar" class="progress-bar" style="width: ${atkPercent}%; background-color:${colorBar}"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 10%;">DEF</td>
                <td style="width: 5%;">${currentPokemon['stats'][2]['base_stat']}</td>
                <td>
                    <div class="progress my-2" role="progressbar">
                        <div id="def-bar" class="progress-bar" style="width: ${defPercent}%; background-color:${colorBar}"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 10%;">SP-A</td>
                <td style="width: 5%;">${currentPokemon['stats'][3]['base_stat']}</td>
                <td>
                    <div class="progress my-2" role="progressbar">
                        <div class="progress-bar" style="width: ${spAPercent}%; background-color:${colorBar}"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 10%;">SP-D</td>
                <td style="width: 5%;">${currentPokemon['stats'][4]['base_stat']}</td>
                <td>
                    <div class="progress my-2" role="progressbar">
                        <div class="progress-bar" style="width: ${spDPercent}%; background-color:${colorBar}"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 10%;">SPD</td>
                <td style="width: 5%;">${currentPokemon['stats'][5]['base_stat']}</td>
                <td>
                    <div class="progress my-2" role="progressbar">
                        <div class="progress-bar" style="width: ${spdPercent}%; background-color:${colorBar}"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 10%;">TOTAL</td>
                <td style="width: 5%;">${totalPoints}</td>
                <td>
                    <div class="progress my-2" role="progressbar">
                        <div class="progress-bar" style="width: ${totalPercent}%; background-color:${colorBar}"></div>
                    </div>
                </td>
            </tr>
        </tbody>
      </table>
      `
    );
}


function menuContentEvolutionHtml(currentPokemon) {
    return (
        `
        evolution - coming soon
        `
    );
}


function menuContentMovesHtml(currentPokemon) {
    return (
        `
        <div style="text-align: center;">
            ${renderMoves(currentPokemon)}
        </div>
        `
    );
}


function renderMoves(currentPokemon) {
    let allMoves = '';

    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        allMoves += `<div>${currentPokemon['moves'][i]['move']['name']}</div>`;
    }

    return allMoves;
}


function renderAbilities(currentPokemon) {
    if (currentPokemon['abilities'].length == 1) {
        return (
            `
            ${currentPokemon['abilities'][0]['ability']['name']}
            `
        );
    } else {
        return (
            `
            ${currentPokemon['abilities'][0]['ability']['name']},
            ${currentPokemon['abilities'][1]['ability']['name']}
            `
        );
    }
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

function renderTypesBigCard(i, currentPokemon) {
    if (currentPokemon['types'].length == 1) {
        return (
            `                
            <div id="first-type-big-${i}">${currentPokemon['types'][0]['type']['name']}</div>
            `
        );
    } else {
        return (
            `                
            <div id="first-type-big-${i}">${currentPokemon['types'][0]['type']['name']}</div>
            <div class="mx-1" id="second-type-big-${i}">${currentPokemon['types'][1]['type']['name']}</div>

            `
        );
    }
}