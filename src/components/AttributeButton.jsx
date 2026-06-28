

function AttributeButton({ label, value, banList, onBan, onUnban }) {
    // some values need to be differentiated by label such as weight and height so we add a label
    const banValue = `${label}: ${value}`;
    const isBanned = banList.includes(banValue);

    return (
        <button onClick={() => isBanned ? onUnban(banValue) : onBan(banValue)}>{banValue}</button>
    )
}

export default AttributeButton;