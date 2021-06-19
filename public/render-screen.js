export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 720, 480)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        //context.fillStyle = 'black'
        //context.fillRect(player.x, player.y, 25, 25)
        player.angle += player.moveAngle * Math.PI / 180;
        player.x += player.speed * Math.sin(player.angle);
        player.y -= player.speed * Math.cos(player.angle);
        context.save();
        context.translate(player.x,player.y);
        context.rotate(player.angle);
        context.fillStyle = 'black';
        context.fillRect(25/-2, 25/-2, 25, 25);
        context.restore();
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        currentPlayer.angle += currentPlayer.moveAngle * Math.PI / 180;
        currentPlayer.x += currentPlayer.speed * Math.sin(currentPlayer.angle);
        currentPlayer.y -= currentPlayer.speed * Math.cos(currentPlayer.angle);
        context.save();
        context.translate(currentPlayer.x,currentPlayer.y);
        context.rotate(currentPlayer.angle);
        context.fillStyle = 'red';
        context.fillRect(25/-2, 25/-2, 25, 25);
        context.restore();
        currentPlayer.moveAngle = 0;
        currentPlayer.speed = 0;
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    })
}
