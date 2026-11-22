/* ==================== TOOL 6: ENEMY PATROL AI ==================== */
const patrolState = {
  x: 140, y: 175, lineY: 175, minX: 90, maxX: 430,
  dir: 1, speed: 2.5, aggro: 130,
  playerX: 460, playerY: 55,
  state: 'PATROL',
  elimFlashUntil: 0
};

function updatePatrolParams() {
  patrolState.speed = parseFloat(document.getElementById('patrolSpeedSlider').value);
  patrolState.aggro = parseInt(document.getElementById('aggroSlider').value, 10);
  document.getElementById('patrolSpeedLbl').textContent = patrolState.speed.toFixed(1);
  document.getElementById('aggroLbl').textContent = patrolState.aggro;
}

function resetPatrolEncounter() {
  patrolState.x = 140;
  patrolState.y = patrolState.lineY;
  patrolState.dir = 1;
  patrolState.state = 'PATROL';
  patrolState.playerX = 460;
  patrolState.playerY = 55;
}

function initPatrolPointer() {
  const canvas = document.getElementById('patrolCanvas');
  const setPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    patrolState.playerX = Math.max(12, Math.min(508, (e.clientX - rect.left) * (canvas.width / rect.width)));
    patrolState.playerY = Math.max(12, Math.min(308, (e.clientY - rect.top) * (canvas.height / rect.height)));
  };
  canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); setPos(e); });
  canvas.addEventListener('pointermove', (e) => { setPos(e); });
}

function stepAndDrawPatrol(now) {
  const canvas = document.getElementById('patrolCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (now < patrolState.elimFlashUntil) {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, 0, 520, 320);
    return;
  } else if (patrolState.elimFlashUntil !== 0) {
    patrolState.elimFlashUntil = 0;
    resetPatrolEncounter();
  }

  const dx = patrolState.playerX - patrolState.x;
  const dy = patrolState.playerY - patrolState.y;
  const dist = Math.hypot(dx, dy);

  if (dist < 26) {
    patrolState.elimFlashUntil = now + 1000;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, 0, 520, 320);
    return;
  }

  if (dist < patrolState.aggro) {
    patrolState.state = 'CHASE';
    const chaseSpeed = patrolState.speed * 1.15;
    patrolState.x += (dx / dist) * chaseSpeed;
    patrolState.y += (dy / dist) * chaseSpeed;
  } else {
    const targetX = Math.max(patrolState.minX, Math.min(patrolState.maxX, patrolState.x));
    const targetY = patrolState.lineY;
    const retDx = targetX - patrolState.x;
    const retDy = targetY - patrolState.y;
    const retDist = Math.hypot(retDx, retDy);

    if (retDist > 3) {
      patrolState.state = 'RETURN';
      patrolState.x += (retDx / retDist) * patrolState.speed;
      patrolState.y += (retDy / retDist) * patrolState.speed;
    } else {
      patrolState.state = 'PATROL';
      patrolState.y = patrolState.lineY;
      patrolState.x += patrolState.dir * patrolState.speed;
      if (patrolState.x >= patrolState.maxX) {
        patrolState.x = patrolState.maxX;
        patrolState.dir = -1;
      } else if (patrolState.x <= patrolState.minX) {
        patrolState.x = patrolState.minX;
        patrolState.dir = 1;
      }
    }
  }

  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, 520, 320);

  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(patrolState.minX, patrolState.lineY);
  ctx.lineTo(patrolState.maxX, patrolState.lineY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#64748b';
  ctx.beginPath(); ctx.arc(patrolState.minX, patrolState.lineY, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(patrolState.maxX, patrolState.lineY, 5, 0, Math.PI * 2); ctx.fill();

  if (patrolState.state === 'RETURN') {
    const nearX = Math.max(patrolState.minX, Math.min(patrolState.maxX, patrolState.x));
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(patrolState.x, patrolState.y);
    ctx.lineTo(nearX, patrolState.lineY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.fillStyle = patrolState.state === 'CHASE' ? 'rgba(239, 68, 68, 0.16)' : 'rgba(45, 212, 191, 0.08)';
  ctx.strokeStyle = patrolState.state === 'CHASE' ? '#ef4444' : '#2dd4bf';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(patrolState.x, patrolState.y, patrolState.aggro, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.fillRect(patrolState.x - 16, patrolState.y - 16, 32, 32);
  ctx.fillStyle = '#ffffff'; ctx.font = '11px monospace';
  ctx.fillText('GUARD', patrolState.x - 16, patrolState.y - 22);

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath(); ctx.arc(patrolState.playerX, patrolState.playerY, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillText('PLAYER', patrolState.playerX - 20, patrolState.playerY - 16);

  document.getElementById('patrolStateTag').textContent = `STATE: ${patrolState.state}`;
  document.getElementById('patrolCodeOutput').textContent = [
    `speed = ${patrolState.speed.toFixed(1)}`,
    `aggro_range = ${patrolState.aggro}`,
    `dist = math.hypot(player.x - guard.x, player.y - guard.y)  # ${Math.round(dist)}px`,
    '',
    'if dist < 26:                 # Player eliminated!',
    '    flash_red_1s_and_reset()',
    'elif dist < aggro_range:      # Chase player',
    '    state = "CHASE"',
    '    move_toward(guard, player, speed * 1.15)',
    'elif distance_to_line(guard) > 3:',
    '    state = "RETURN"          # Head back to nearest line point',
    '    move_toward(guard, nearest_point_on_line, speed)',
    'else:',
    '    state = "PATROL"          # Pace between min_x and max_x',
    '    guard.x += patrol_dir * speed'
  ].join('\n');
}

