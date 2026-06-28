
// outside component so it is declared once and not on every re-render
const baseURL = 'https://pokeapi.co/api/v2/pokemon';

function Dashboard({ pokemon, setPokemon }) {

    function getRandomId() {

        // hardcoded max range but could be improved for customization
        return Math.floor(Math.random() * 1351) + 1;
    }

    async function fetchData() {
        // build url
        const randomId = getRandomId();
        const url = `${baseURL}/${randomId}`;

        try {
            // fetch url and check for http errors
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error: ${response.error}`);

            const data = await response.json();
            // console.log(data);
            setPokemon(data);
        } catch (error) {
            console.error('Something went wrong: ', error);
        }
    }

    return (
        <div className="dashboard">
            <h1>Dashboard section</h1>
            {
                pokemon && (
                <>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} />
                    <img src={pokemon.sprites.back_default} />
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Base Exp: {pokemon.base_experience}</p>
                    {pokemon.abilities.map((abilityObject) => (
                        <p key={abilityObject.slot}>Ability: {abilityObject.ability.name}</p>
                    ))}
                    {pokemon.types.map((typeObject) => (
                        <p key={typeObject.slot}>Type: {typeObject.type.name}</p>
                    ))}
                </>
            )}
            <button onClick={fetchData}>Discover!</button>
        </div>
    )
}

export default Dashboard;