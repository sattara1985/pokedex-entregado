// Aquí estamos declarando una variable llamada "pokemons" que será una lista donde guardaremos información de los pokemon
let pokemons= [];
// La siguiente línea de código está buscando en el HTML un elemento que tiene el id "pokemon_caja_js" y lo guarda en una variable llamada "poke_caja" don de va aocntener cada pokemon a mostrar.
const poke_caja = document.getElementById("pokemon_caja_js");
// Esta es una dirección url a una pagina web donde podemos obtener información sobre los pokémon. Se guarda en una variable llamada "url".
const url = "https://pokeapi.co/api/v2/pokemon";
// Aquí estamos declarando otra variable llamada "cantidad_pokemon" y le damos el valor de 200. Esto significa que queremos obtener información sobre los primeros 200 pokemones ya que si le pongo muchos se bloquea.
const cantidad_pokemon = 200;
// Luego, estamos buscando en el HTML un elemento que tiene el id "busqueda_poke_js" y lo guardamos en una variable llamada "busqueda_poke".
const busqueda_poke = document.getElementById("busqueda_poke_js");
// También buscamos otro elemento en el HTML con el id "formulario" y lo guardamos en una variable llamada "formulario".
const formulario = document.getElementById("formulario");




// Ahora viene una función llamada fetchPokemones Esta función  obteniene información sobre los pokemon y mostrarla
const fetchPokemones = async ()=>{
     // Seguiremos repitiendo las instrucciones hasta llegar al número 200.
    for (let i = 1; i <=cantidad_pokemon ; i++){
        // En cada vuelta del "for loop", llamamos a otra función llamada "getAllPokemon" y le pasamos el número actual en "i". para obtener información sobre un pokemon especifico.
        await getAllPokemones(i);
    }
    // Una vez que hemos obtenido información sobre todos los 200 pokemones llamamos a otra función llamada "createPokemonCaja" para mostrar los pokemon
    pokemons.forEach((pokemon) => createPokemonCaja(pokemon));      
    

};


// La siguiente funcion se llama cleanpokemones nos ayuda a eliminar información de los pokemon que se muestran 
const CleanPokemones = async (id) =>{
    // Aquí estamos buscando todos los elementos en la página web que tienen una clase llamada "pokemon" y los guardamos en una lista llamada pokemonMostrar.
    const pokemonMostrar = document.getElementsByClassName("pokemon");

     // Creamos una lista vacía llamada "DeletePokemones" donde guardaremos los pokémon que queremos eliminar.
   
    let DeletePokemones=[];
    // recorre todos los elementos en la lista pokemonMostrar.
    for (let i =0; i<pokemonMostrar.length; i++){
        // obtenemos el elemento actual en la lista "pokemonMostrar" y lo guardamos en una variable llamada "pokemonActual".
        //const pokemonEl = pokemonMostrar[i];
        const pokemonActual = pokemonMostrar[i];
         // añadimos el elemento a la lista DeletePokemones para que podamos eliminarlo
         DeletePokemones =[...DeletePokemones,pokemonActual];
    }
     // Finalmente, usamos otro for para recorrer la lista DeltePokemones y eliminar los pokemones de la página
     DeletePokemones.forEach((DeletePoke)=>DeletePoke.remove());
};




// La siguiente función se llama "getPokemon" y nos ayudará a filtrar y mostrar información sobre un pokemon especifico cuando el usuario lo busca.

const getPokemon = async(id)=>{
    // Usamos una lista llamada "searchPokemons" para guardar los pokemon que coinciden con el nombre que el usuario busca.
    const searchPokemons=pokemons.filter((poke)=>poke.name === id);
     // Luego, llamamos a la función "removePokemon" para eliminar los pokemon que ya estan mostrados y asi mostar el que se esta buscando.
     CleanPokemones();
    // Finalmente, usamos otro "for loop" para recorrer la lista "searchPokemons" y llamamos a la función "createPokemonCard" para mostrar el pokemon buscado
    searchPokemons.forEach((pokemon)=>createPokemonCaja(pokemon));

};


// La siguiente función se llama "getAllPokemon" y nos ayudará a obtener información sobre un pokemon especifico segun su número.
const getAllPokemones=async(id)=>{
    // Usamos la función fetch para obtener informacion desde la direccion URL almacenada en la variable url junto con el numero del pokemon que queremos obtener.
    const res = await fetch(`${url}/${id}`);
    console.log(res);
    // Luego, convertimos la información obtenida en un formato .json lo guardamos en una variable llamada pokemon.
    const pokemon = await res.json();
      // Finalmente, añadimos el pokemon a la lista pokemons para que podamos mostrarlo.
    pokemons = [...pokemons, pokemon];
};
// Llamamos a la función "fetchPokemons" para comenzar a mostrar información sobre los pokemon en la pagina web.
fetchPokemones();

// La siguiente función se llama "createPokemonCard" y nos ayuda a mostrar un pokemon en el formato de una tarjeta en la pagina web. asignando la clase pokemon par apoder ponerle el stilo deseado
function createPokemonCaja(pokemon){
     // ... Cadigo para crear la tarjeta de un pokemon ...
    const pokemonActual = document.createElement("div");
    pokemonActual.classList.add("pokemon");
    const poke_types=pokemon.types.map((el) => el.type.name).slice(0,1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_stat= pokemon.stats.map((el)=> el.stat.name);
    const stats = poke_stat.slice(0, 3);
    const base_value = pokemon.stats.map((el)=> el.base_stat);
    const base_stat=base_value.slice(0,3);
    const stat = stats.map((stat)=>{
        return `<li class="names">${stat}</li>`;
    }).join("");
    const base = base_stat.map((base)=>{
        return `<li class="base">${base}</li>`
    }).join("");
    const pokeInnerHTML =`<div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}"/>
    </div>
    <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3,"0")}</span>
    <h3 class="name">${name}</h3>
    <small class="type"><span>${poke_types}</span></small>
    </div>
    <div class="stats">
    <h2>Stats</h2>
    <div class="flex">
    <ul>${stat}</ul>
    <ul>${base}</ul>
    </div>
    </div>`;
    pokemonActual.innerHTML=pokeInnerHTML;
    poke_caja.appendChild(pokemonActual);


}
// agrega un evento al formulario  "submit".
formulario.addEventListener("submit",(e)=>{
     // evitamos que la pagina se recargue cuando enviamos el formulario.
    e.preventDefault();
    //  obtenemos el texto que el usuario ha escrito en el formulario y lo guardamos en una variable llamada buscarPoke
    const buscarPoke = busqueda_poke.value;
    console.log(buscarPoke);

    // Luego, comprobamos si buscarPoke no esta vacio Si el usuario ha escrito algo en el formulario, llamamos a la funcion getPokemon y le pasamos el texto que el usuario escribio. 
    //Luego, limpiamos el formulario para que esté listo para otra búsqueda.
    if(buscarPoke){
        getPokemon(buscarPoke);
        console.log("lo encontre");

        busqueda_poke.value="";

    }else if(buscarPoke ===""){
        console.log("vacio");
         // Si buscarPoke esta vacio, eso significa que el usuario no ha escrito nada en el formulario. 
         //En este caso, limpiamos la lista de pokemon y mostramos todos los pokémon nuevo
        pokemons=[];
        CleanPokemones();
        fetchPokemones();
    }
});
