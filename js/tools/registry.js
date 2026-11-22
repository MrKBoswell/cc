const TOOL_META = {
  grid:      { title: '2D Pygame Coordinate Grid Visualizer', subtitle: 'Explore (0, 0) top-left screen coordinates and pygame.draw.rect parameters.' },
  inspector: { title: 'Pygame RGB Colour & Rect Inspector', subtitle: 'Mix RGB colour tuples and inspect pygame.Rect position and size properties.' },
  movement:  { title: 'Pygame Movement & Boundary Simulator', subtitle: 'Hold keys or D-Pad buttons and see the active lines highlight live.' },
  collision: { title: 'Pygame Hitbox & Collision Playground', subtitle: 'Test rect1.colliderect(rect2) overlap detection and live score updates.' },
  gravity:   { title: 'Gravity, Jump & Velocity Sandbox', subtitle: 'Move left/right, jump above the top edge with an XY arrow tracker, and tweak gravity.' },
  patrol:    { title: 'Enemy Patrol & Waypoint AI', subtitle: 'Guard patrols a line, chases when in range, returns to nearest point, and resets on catch.' },
  aiming:    { title: 'Mouse Aiming & Angle Rotation (math.atan2)', subtitle: 'Touch or move your cursor around the turret to calculate dx, dy, and rotation angle.' }
};

let currentToolId = 'grid';

function openTool(toolId) {
  activeView = 'workspace';
  currentToolId = toolId;
  document.querySelectorAll('.subview').forEach(el => el.classList.remove('active'));
  document.getElementById('view-workspace').classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === 'tools');
  });

  document.querySelectorAll('.switch-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.tool === toolId);
  });

  document.querySelectorAll('.tool-pane').forEach(pane => pane.style.display = 'none');
  document.getElementById('tool-' + toolId).style.display = 'block';

  document.getElementById('activeToolTitle').textContent = TOOL_META[toolId].title;
  document.getElementById('activeToolSubtitle').textContent = TOOL_META[toolId].subtitle;

  if (toolId === 'grid') drawGridCanvas();
  if (toolId === 'inspector') drawInspectorCanvas();
  if (toolId === 'movement') drawMoveCanvas();
  if (toolId === 'collision') drawCollisionCanvas();
  if (toolId === 'gravity') updateGravityParams();
  if (toolId === 'patrol') updatePatrolParams();
  if (toolId === 'aiming') drawAimCanvas();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

