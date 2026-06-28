

function HistoryList({ history }) {
    return (
        <>
            <h1>History List</h1>
            <div className="history-list">
                {history.map((pokemon) => (
                    <div key={pokemon.id}>
                        <img src={pokemon.sprites.front_default} />
                        <img src={pokemon.sprites.back_default} />
                        <p>{pokemon.name}</p>
                    </div>

                ))}
            </div>
        </>
    )
}

export default HistoryList;