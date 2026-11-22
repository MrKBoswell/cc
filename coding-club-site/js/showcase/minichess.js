// 1. Mini Chess (6x6 Chess360) State
const MINI_CHESS_BASE_BACK = ['r', 'n', 'b', 'q', 'k', 'r'];
const MINI_CHESS_GLYPHS = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟'
};
const BOARD_PALETTES = [
  { name: 'Slate & Ice', light: '#cbd5e1', dark: '#334155', accent: '#2dd4bf' },
  { name: 'Amber Classroom', light: '#fde68a', dark: '#78350f', accent: '#f59e0b' },
  { name: 'Emerald Pitch', light: '#d1fae5', dark: '#065f46', accent: '#34d399' }
];

let mchess = {
  board: [],
  turn: 'White',
  selected: null,
  cursor: { r: 4, c: 2 },
  moves: 0,
  paletteIdx: 0,
  pointerBound: false
};

function shuffledChess360BackRank() {
  const pieces = MINI_CHESS_BASE_BACK.slice();
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }
  return pieces;
}

function buildMiniChessBoard() {
  const blackBack = shuffledChess360BackRank();
  const whiteBack = blackBack.map(ch => ch.toUpperCase());
  return [
    blackBack,
    ['p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P'],
    whiteBack
  ];
}

function initMiniChess() {
  const bound = mchess ? mchess.pointerBound : false;
  const pal = mchess ? mchess.paletteIdx : 0;
  mchess = {
    board: buildMiniChessBoard(),
    turn: 'White',
    selected: null,
    cursor: { r: 4, c: 2 },
    moves: 0,
    paletteIdx: pal,
    pointerBound: bound
  };
}

function cycleMiniChessBoardStyle() {
  mchess.paletteIdx = (mchess.paletteIdx + 1) % BOARD_PALETTES.length;
  updateShowcaseUI();
}

function handleMiniChessSquare(r, c) {
  if (r < 0 || r >= 6 || c < 0 || c >= 6) return;
  const piece = mchess.board[r][c];
  if (!mchess.selected) {
    if (piece) {
      const isWhitePiece = piece === piece.toUpperCase();
      if ((mchess.turn === 'White' && isWhitePiece) || (mchess.turn === 'Black' && !isWhitePiece)) {
        mchess.selected = { r, c };
      }
    }
  } else {
    const sr = mchess.selected.r, sc = mchess.selected.c;
    if (sr === r && sc === c) {
      mchess.selected = null;
    } else {
      mchess.board[r][c] = mchess.board[sr][sc];
      mchess.board[sr][sc] = '';
      mchess.selected = null;
      mchess.moves += 1;
      mchess.turn = mchess.turn === 'White' ? 'Black' : 'White';
    }
  }
}

function bindShowcaseCanvasOnce(canvas) {
  if (!canvas || canvas.dataset.showcaseBound === '1') return;
  canvas.dataset.showcaseBound = '1';
  canvas.addEventListener('pointerdown', (e) => {
    if (activeView !== 'yourgames' || activeShowcaseGame !== 'minichess') return;
    const rect = canvas.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (canvas.width / rect.width);
    const py = (e.clientY - rect.top) * (canvas.height / rect.height);
    const sq = 54, ox = 108, oy = 28;
    const col = Math.floor((px - ox) / sq);
    const row = Math.floor((py - oy) / sq);
    if (row >= 0 && row < 6 && col >= 0 && col < 6) {
      mchess.cursor = { r: row, c: col };
      handleMiniChessSquare(row, col);
    }
  });
}

function stepMiniChessShowcase(ctx) {
  bindShowcaseCanvasOnce(ctx.canvas);
  const pal = BOARD_PALETTES[mchess.paletteIdx];
  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, 540, 380);

  const sq = 54, ox = 108, oy = 28;
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      const light = (r + c) % 2 === 0;
      ctx.fillStyle = light ? pal.light : pal.dark;
      ctx.fillRect(ox + c * sq, oy + r * sq, sq, sq);

      if (mchess.selected && mchess.selected.r === r && mchess.selected.c === c) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3.5;
        ctx.strokeRect(ox + c * sq + 2, oy + r * sq + 2, sq - 4, sq - 4);
      }
      if (mchess.cursor.r === r && mchess.cursor.c === c) {
        ctx.strokeStyle = pal.accent;
        ctx.lineWidth = 2;
        ctx.strokeRect(ox + c * sq + 4, oy + r * sq + 4, sq - 8, sq - 8);
      }

      const piece = mchess.board[r][c];
      if (piece) {
        ctx.fillStyle = piece === piece.toUpperCase() ? '#0f172a' : '#f8fafc';
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(MINI_CHESS_GLYPHS[piece] || piece, ox + c * sq + sq / 2, oy + r * sq + sq / 2 + 1);
      }
    }
  }

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(`6×6 Chess360`, 14, 34);
  ctx.fillStyle = pal.accent;
  ctx.fillText(`Turn: ${mchess.turn}`, 14, 58);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(`Moves: ${mchess.moves}`, 14, 82);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px monospace';
  ctx.fillText(`Board: ${pal.name}`, 14, 106);

  document.getElementById('showcaseHudBadge').textContent = `Turn: ${mchess.turn} • Moves: ${mchess.moves}`;
}

