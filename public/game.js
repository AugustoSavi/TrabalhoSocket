export default function createGame() {
    const state = {
        players: {},
        screen: {
            width: 696,
            height: 455
        }
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

        const speed = 0;
        const angle = 0;
        const moveAngle = 0;
        state.players[playerId] = {
            x: playerX,
            y: playerY,
            speed: speed,
            angle: angle,
            moveAngle: moveAngle
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
            speed: speed,
            angle: angle,
            moveAngle: moveAngle
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }

    function movePlayer(command) {
        notifyAll(command)

        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    //player.y = player.y - 3
                    player.speed = 1;
                }
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width) {
                    //player.x = player.x + 3;
                    player.moveAngle = 1;
                }
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height) {
                    //player.y = player.y + 3
                    player.speed = -1;
                }
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0) {
                    //player.x = player.x - 3
                    player.moveAngle = -1;
                }
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
        }

    }

    return {
        addPlayer,
        removePlayer,
        movePlayer,
        state,
        setState,
        subscribe
    }
}
