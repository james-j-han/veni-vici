import AttributeButton from "./AttributeButton"

function BanList({ banList, onUnban }) {
    return (
        <>
            <h1>Ban List</h1>
            <div className="ban-list">
                {banList.map((item) => (
                    <button key={item} onClick={() => onUnban(item)}>{item}</button>
                ))}
            </div>
        </>
    )
}

export default BanList;