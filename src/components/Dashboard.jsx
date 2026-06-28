import AttributeButton from './AttributeButton';

// outside component so it is declared once and not on every re-render
const baseURL = 'https://pokeapi.co/api/v2/pokemon';

function Dashboard({ pokemon, setPokemon, banList, onBan, onUnban }) {

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
            <button onClick={fetchData}>Discover!</button>
        </div>
    )
}

export default Dashboard;