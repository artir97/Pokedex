function baseStats(currentPokemon) {
    let maxPoints = 120;
    let maxPointsTotal = 720;
    let totalPoints = 0;
    let { hpPercent, atkPercent, defPercent, spAPercent, spDPercent, spdPercent } = initBaseStats(currentPokemon, maxPoints);
    let totalPercent = 0; 
    let colorBar = colors[0][currentPokemon['types'][0]['type']['name']][0];

    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        totalPoints += currentPokemon['stats'][i]['base_stat'];
    }
    totalPercent = (totalPoints / maxPointsTotal).toFixed(2) * 100;
    return { hpPercent, colorBar, atkPercent, defPercent, spAPercent, spDPercent, spdPercent, totalPoints, totalPercent };
}


function initBaseStats(currentPokemon, maxPoints) {
    let hpPercent = ((currentPokemon['stats'][0]['base_stat']) / maxPoints).toFixed(2) * 100;
    let atkPercent = ((currentPokemon['stats'][1]['base_stat']) / maxPoints).toFixed(2) * 100;
    let defPercent = ((currentPokemon['stats'][2]['base_stat']) / maxPoints).toFixed(2) * 100;
    let spAPercent = ((currentPokemon['stats'][3]['base_stat']) / maxPoints).toFixed(2) * 100;
    let spDPercent = ((currentPokemon['stats'][4]['base_stat']) / maxPoints).toFixed(2) * 100;
    let spdPercent = ((currentPokemon['stats'][5]['base_stat']) / maxPoints).toFixed(2) * 100;
    return { hpPercent, atkPercent, defPercent, spAPercent, spDPercent, spdPercent };
}


function getColors(currentPokemon) {
    let colorCard = colors[0][currentPokemon['types'][0]['type']['name']][0];
    let colorType = colors[0][currentPokemon['types'][0]['type']['name']][1];
    return { colorCard, colorType };
}


function initVariablesRenderBackgrounds(currentPokemon, i) {
    let currentPokemonType = currentPokemon['types'][0]['type']['name'];

    let currentPokemonId = document.getElementById(`poke-${i}`);
    let currentFirstTypeId = document.getElementById(`first-type-${i}`);
    let currentSecondTypeId = document.getElementById(`second-type-${i}`);
    let currentBackground = colors[0][currentPokemonType][0];
    let currentBackgroundType = colors[0][currentPokemonType][1];

    return { currentPokemonId, currentFirstTypeId, currentBackgroundType, currentSecondTypeId, currentBackground };
}


