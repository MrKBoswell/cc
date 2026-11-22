const GAME_SOURCES = {
  pong: [
    'if keys[K_UP]:   left_paddle.y -= 5',
    'if keys[K_DOWN]: left_paddle.y += 5',
    'ball.x += ball_vx',
    'ball.y += ball_vy',
    'if ball.top <= 0 or ball.bottom >= 380:',
    '    ball_vy = -ball_vy',
    'if ball.colliderect(left_paddle) or ball.colliderect(right_paddle):',
    '    ball_vx = -ball_vx',
    'if ball.left <= 0:  score_p2 += 1',
    'if ball.right >= 500: score_p1 += 1'
  ],
  snake: [
    'head = (snake[0][0] + dir_x, snake[0][1] + dir_y)',
    'snake.insert(0, head)',
    'if head == food:',
    '    length = len(snake)',
    '    spawn_food()',
    'else:',
    '    snake.pop()',
    'if head in snake[1:] or out_of_bounds(head):',
    '    reset_snake()'
  ],
  tetris: [
    'piece.y += 1',
    'if keys[K_LEFT]:  piece.x -= 1',
    'if keys[K_RIGHT]: piece.x += 1',
    'if keys[K_UP] or keys[K_SPACE]:',
    '    rotate_piece(piece)',
    'if collides(piece, board):',
    '    lock_piece(piece)',
    '    lines_cleared += clear_full_rows(board)',
    '    spawn_next_piece()'
  ],
  invaders: [
    'if keys[K_LEFT]:  ship.x -= 5',
    'if keys[K_RIGHT]: ship.x += 5',
    'if keys[K_SPACE] and cooldown == 0:',
    '    bullets.append(Rect(ship.centerx, ship.y, 4, 12))',
    'for b in bullets:',
    '    b.y -= 8',
    'for alien in aliens:',
    '    alien.x += alien_vx',
    '    if b.colliderect(alien):',
    '        aliens.remove(alien)',
    '        score += 50'
  ],
  breakout: [
    'if keys[K_LEFT]:  paddle.x -= 6',
    'if keys[K_RIGHT]: paddle.x += 6',
    'ball.x += ball_vx',
    'ball.y += ball_vy',
    'if ball.left <= 0 or ball.right >= 500:',
    '    ball_vx = -ball_vx',
    'if ball.top <= 0 or ball.colliderect(paddle):',
    '    ball_vy = -ball_vy',
    'for brick in bricks:',
    '    if ball.colliderect(brick):',
    '        bricks.remove(brick)',
    '        ball_vy = -ball_vy',
    '        score += 10'
  ],
  flappy: [
    'if keys[K_SPACE] or keys[K_UP]:',
    '    vy = -7.2',
    'vy += 0.42',
    'bird.y += vy',
    'pipe_x -= 3.5',
    'if pipe_x + 50 < 110 and not scored_pipe:',
    '    score += 1',
    '    scored_pipe = True',
    'if pipe_x < -50:',
    '    pipe_x = 500; scored_pipe = False',
    'if bird.colliderect(top_pipe) or bird.colliderect(bot_pipe):',
    '    reset_flappy()'
  ],
  maze: [
    'old_x, old_y = player.x, player.y',
    'if keys[K_LEFT]:  player.x -= 4',
    'if keys[K_RIGHT]: player.x += 4',
    'if keys[K_UP]:    player.y -= 4',
    'if keys[K_DOWN]:  player.y += 4',
    'if player.collidelist(walls) != -1:',
    '    player.x, player.y = old_x, old_y',
    'if player.colliderect(key_rect):',
    '    has_key = True',
    'if player.colliderect(door_rect) and has_key:',
    '    level_complete = True'
  ],
  asteroids: [
    'if keys[K_LEFT]:  ship.x -= 6',
    'if keys[K_RIGHT]: ship.x += 6',
    'for rock in rocks:',
    '    rock.y += rock.spd',
    '    if rock.y > 385:',
    '        dodged += 1',
    '        respawn_random_rock(rock)',
    '    if ship.colliderect(rock):',
    '        reset_random_asteroids()'
  ]
};

