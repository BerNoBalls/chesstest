const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: handleMove
});

const game = new Chess();

function updateMoveList() {
  const moves = game.history();
  const container = document.getElementById('moves');
  container.innerHTML = '<strong>Nước đi:</strong>';
  moves.forEach((m, i) => {
    const p = document.createElement('p');
    p.textContent = `${Math.floor(i/2)+1}. ${i%2 === 0 ? 'Trắng' : 'Đen'}: ${m}`;
    container.appendChild(p);
  });
  container.scrollTop = container.scrollHeight;
}

function handleMove(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';
  updateMoveList();
  setTimeout(botMove, 500);
}

function botMove() {
  const moves = game.moves();
  if (game.game_over() || moves.length === 0) return;
  const move = moves[Math.floor(Math.random() * moves.length)];
  game.move(move);
  board.position(game.fen());
  updateMoveList();
}