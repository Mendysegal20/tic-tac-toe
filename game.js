const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const restartBtn = document.querySelector("#restartBtn")
const winConditions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let options = ["","","","","","","","",""]
let currentPlayer = "X"
let running = false

initializeGame()

function initializeGame()
{
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    statusText.textContent = `${currentPlayer}'s turn`
    running = true
}

function cellClicked()
{
    const cellIndex = this.getAttribute("cellIndex")
    if (options[cellIndex] != "" || !running)
        return
    updateCell(this, cellIndex)
    checkWinner()
}

function updateCell(cell, index)
{
    options[index] = currentPlayer
    cell.textContent = currentPlayer;
    cell.style.color = (currentPlayer == "X") ? "rgb(204, 120, 120)" : "rgb(120, 172, 204)"
}

function changePlayer()
{
    currentPlayer = (currentPlayer == "X") ? "O": "X"
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner()
{
    roundWon = false
    for(let i = 0; i < winConditions.length; i++)
    {
        const condition = winConditions[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]
        if (cellA !== "" && cellA == cellB && cellA == cellC) 
        {
            roundWon = true
            break
        }
    }

    if (roundWon)
    {
        statusText.textContent = `${currentPlayer} wins!`
        running = false
    }
    else if (!options.includes(""))
    {
        statusText.textContent = `draw!`
        running = false
    }
    else
        changePlayer()
}

function restartGame()
{
    currentPlayer = "X"
    options = ["","","","","","","","",""]
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = "")
    running = true;
    cells.forEach(cell => cell.style.color = "black");
}