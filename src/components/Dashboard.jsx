import AttributeButton from './AttributeButton';

// outside component so it is declared once and not on every re-render
const baseURL = 'https://pokeapi.co/api/v2/pokemon';

function Dashboard({ pokemon, setPokemon, banList, onBan, onUnban, onDiscover }) {

    function getRandomId() {

        // hardcoded max range but could be improved for customization
        return Math.floor(Math.random() * 1000) + 1;
    }

    async function fetchData() {
        try {
            let foundPokemon = null;
            // limit number of attempts
            let attempts = 0;
            let maxAttempts = 10;

            while (!foundPokemon && attempts < maxAttempts) {
                attempts++;
                // build url
                const randomId = getRandomId();
                const url = `${baseURL}/${randomId}`;

                // fetch url and check for http errors
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error: ${response.error}`);
                const data = await response.json();

                // current pokemon attributes to compare with ban list
                const attributes = [
                    `Height: ${data.height}`,
                    `Weight: ${data.Weight}`,
                    `Base Exp: ${data.base_experience}`,
                    ...data.types.map((t) => `Type: ${t.type.name}`),
                    ...data.abilities.map((a) => `Ability: ${a.ability.name}`)
                ];

                // compare if any attributes are on ban list
                const isBanned = attributes.some((attr) => banList.includes(attr));

                if (!isBanned) {
                    foundPokemon = data;
                }
            }

            if (foundPokemon) {
                // console.log(data);
                setPokemon(foundPokemon);
                // add to history list
                onDiscover(foundPokemon);
            } else {
                console.error('Could not find a valid Pokemon, ban list may be too restrictive');
                alert('Could not find a valid Pokemon, ban list may be too restrictive');
            }

        } catch (error) {
            console.error('Something went wrong: ', error);
        }
    }

    return (
        <div className="dashboard">
            <h1>Dashboard section</h1>
            <button className='discover-button' onClick={fetchData}>Discover!</button>
            {
                pokemon && (
                <div className='pokemon-container'>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} />
                    <img src={pokemon.sprites.back_default} />
                    <div className='attributes-container'>
                        <AttributeButton label='Height' value={pokemon.height} banList={banList} onBan={onBan} onUnban={onUnban} />
                        <AttributeButton label='Weight' value={pokemon.weight} banList={banList} onBan={onBan} onUnban={onUnban} />
                        <AttributeButton label='Base Exp' value={pokemon.base_experience} banList={banList} onBan={onBan} onUnban={onUnban} />
                        {pokemon.abilities.map((abilityObject) => (
                            <AttributeButton
                                key={abilityObject.slot}
                                label='Ability'
                                value={abilityObject.ability.name}
                                banList={banList}
                                onBan={onBan}
                                onUnban={onUnban}
                            />
                        ))}
                        {pokemon.types.map((typeObject) => (
                            <AttributeButton
                                key={typeObject.slot}
                                label='Type'
                                value={typeObject.type.name}
                                banList={banList}
                                onBan={onBan}
                                onUnban={onUnban}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;