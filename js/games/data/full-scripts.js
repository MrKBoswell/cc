const FULL_GAME_SCRIPTS = {
  pong: `import pygame

pygame.init()
screen = pygame.display.set_mode((500, 380))
clock = pygame.time.Clock()

left_paddle = pygame.Rect(20, 150, 12, 70)
right_paddle = pygame.Rect(468, 150, 12, 70)
ball = pygame.Rect(242, 182, 16, 16)
ball_vx, ball_vy = 4, 3
score_p1, score_p2 = 0, 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        left_paddle.y = max(10, left_paddle.y - 5)
    if keys[pygame.K_DOWN]:
        left_paddle.y = min(300, left_paddle.y + 5)

    right_paddle.y += (1 if ball.centery > right_paddle.centery else -1) * 3
    ball.x += ball_vx
    ball.y += ball_vy

    if ball.top <= 0 or ball.bottom >= 380:
        ball_vy = -ball_vy
    if ball.colliderect(left_paddle) or ball.colliderect(right_paddle):
        ball_vx = -ball_vx
    if ball.left <= 0:
        score_p2 += 1
        ball.center = (250, 190)
    if ball.right >= 500:
        score_p1 += 1
        ball.center = (250, 190)

    screen.fill((11, 16, 24))
    pygame.draw.rect(screen, (56, 189, 248), left_paddle)
    pygame.draw.rect(screen, (245, 158, 11), right_paddle)
    pygame.draw.ellipse(screen, (255, 255, 255), ball)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,

  snake: `import pygame, random

pygame.init()
screen = pygame.display.set_mode((500, 380))
clock = pygame.time.Clock()
GRID = 20

snake = [(10, 9), (9, 9), (8, 9)]
dir_x, dir_y = 1, 0
food = (16, 9)

def spawn_food():
    return (random.randint(0, 24), random.randint(0, 18))

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP and dir_y != 1:
                dir_x, dir_y = 0, -1
            elif event.key == pygame.K_DOWN and dir_y != -1:
                dir_x, dir_y = 0, 1
            elif event.key == pygame.K_LEFT and dir_x != 1:
                dir_x, dir_y = -1, 0
            elif event.key == pygame.K_RIGHT and dir_x != -1:
                dir_x, dir_y = 1, 0

    head = (snake[0][0] + dir_x, snake[0][1] + dir_y)
    if head[0] < 0 or head[0] >= 25 or head[1] < 0 or head[1] >= 19 or head in snake:
        snake = [(10, 9), (9, 9), (8, 9)]
        dir_x, dir_y = 1, 0
    else:
        snake.insert(0, head)
        if head == food:
            food = spawn_food()
        else:
            snake.pop()

    screen.fill((11, 16, 24))
    pygame.draw.rect(screen, (239, 68, 68), (food[0]*GRID, food[1]*GRID, GRID-2, GRID-2))
    for i, (sx, sy) in enumerate(snake):
        color = (45, 212, 191) if i == 0 else (34, 197, 94)
        pygame.draw.rect(screen, color, (sx*GRID, sy*GRID, GRID-2, GRID-2))
    pygame.display.flip()
    clock.tick(8)

pygame.quit()`,

  tetris: `import pygame, random

pygame.init()
screen = pygame.display.set_mode((500, 380))
clock = pygame.time.Clock()

SHAPES = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]]
]
board = [[0] * 10 for _ in range(19)]
piece = {"shape": random.choice(SHAPES), "x": 3, "y": 0}
lines_cleared = 0

def clear_rows(grid):
    cleared = 0
    for r in range(len(grid) - 1, -1, -1):
        if all(grid[r]):
            del grid[r]
            grid.insert(0, [0] * 10)
            cleared += 1
    return cleared

running = True
fall_timer = 0
while running:
    fall_timer += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                piece["x"] -= 1
            elif event.key == pygame.K_RIGHT:
                piece["x"] += 1
            elif event.key in (pygame.K_UP, pygame.K_SPACE):
                piece["shape"] = [list(row) for row in zip(*piece["shape"][::-1])]

    if fall_timer % 22 == 0:
        piece["y"] += 1
        if piece["y"] + len(piece["shape"]) > 19:
            lines_cleared += clear_rows(board)
            piece = {"shape": random.choice(SHAPES), "x": 3, "y": 0}

    screen.fill((11, 16, 24))
    pygame.draw.rect(screen, (51, 65, 85), (150, 0, 200, 380), 2)
    for r, row in enumerate(piece["shape"]):
        for c, cell in enumerate(row):
            if cell:
                pygame.draw.rect(screen, (45, 212, 191), (150 + (piece["x"]+c)*20, (piece["y"]+r)*20, 18, 18))
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,

  invaders: `import pygame

pygame.init()
screen = pygame.display.set_mode((500, 380))
clock = pygame.time.Clock()

ship = pygame.Rect(230, 340, 40, 20)
bullets = []
aliens = [pygame.Rect(60 + c*52, 40 + r*36, 32, 22) for r in range(3) for c in range(7)]
alien_vx = 1.8
cooldown = 0
score = 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    if cooldown > 0:
        cooldown -= 1
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        ship.x = max(10, ship.x - 5)
    if keys[pygame.K_RIGHT]:
        ship.x = min(450, ship.x + 5)
    if keys[pygame.K_SPACE] and cooldown == 0:
        bullets.append(pygame.Rect(ship.centerx - 2, ship.y - 12, 4, 12))
        cooldown = 16

    for b in bullets[:]:
        b.y -= 8
        if b.y < -10:
            bullets.remove(b)

    for alien in aliens[:]:
        alien.x += alien_vx
        for b in bullets[:]:
            if b.colliderect(alien):
                aliens.remove(alien)
                bullets.remove(b)
                score += 50
                break

    screen.fill((11, 16, 24))
    pygame.draw.rect(screen, (45, 212, 191), ship)
    for b in bullets:
        pygame.draw.rect(screen, (245, 158, 11), b)
    for a in aliens:
        pygame.draw.rect(screen, (239, 68, 68), a)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,

  breakout: `import pygame

pygame.init()
screen = pygame.display.set_mode((500, 380))
clock = pygame.time.Clock()

paddle = pygame.Rect(205, 345, 90, 14)
ball = pygame.Rect(243, 253, 14, 14)
ball_vx, ball_vy = 3.5, -3.5
bricks = [pygame.Rect(22 + c*58, 35 + r*24, 52, 16) for r in range(4) for c in range(8)]
score = 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        paddle.x = max(0, paddle.x - 6)
    if keys[pygame.K_RIGHT]:
        paddle.x = min(410, paddle.x + 6)

    ball.x += ball_vx
    ball.y += ball_vy
    if ball.left <= 0 or ball.right >= 500:
        ball_vx = -ball_vx
    if ball.top <= 0 or ball.colliderect(paddle):
        ball_vy = -ball_vy

    for brick in bricks[:]:
        if ball.colliderect(brick):
            bricks.remove(brick)
            ball_vy = -ball_vy
            score += 10
            break

    screen.fill((11, 16, 24))
    for br in bricks:
        pygame.draw.rect(screen, (45, 212, 191), br)
    pygame.draw.rect(screen, (56, 189, 248), paddle)
    pygame.draw.ellipse(screen, (255, 255, 255), ball)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,

  flappy: `import pygame, random

pygame.init()
screen = pygame.display.set_mode((500, 380))
clock = pygame.time.Clock()

bird = pygame.Rect(110, 170, 26, 24)
vy = 0.0
pipe_x = 460
gap_y = 165
score = 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key in (pygame.K_SPACE, pygame.K_UP):
                vy = -7.2

    vy += 0.42
    bird.y += vy
    pipe_x -= 3.5

    if pipe_x < -50:
        pipe_x = 500
        gap_y = random.randint(95, 265)
        score += 1

    top_pipe = pygame.Rect(pipe_x, 0, 50, gap_y - 58)
    bot_pipe = pygame.Rect(pipe_x, gap_y + 58, 50, 380 - (gap_y + 58))
    if bird.colliderect(top_pipe) or bird.colliderect(bot_pipe) or bird.y > 365:
        bird.y = 170
        vy = 0.0
        pipe_x = 460
        score = 0

    screen.fill((11, 16, 24))
    pygame.draw.rect(screen, (34, 197, 94), top_pipe)
    pygame.draw.rect(screen, (34, 197, 94), bot_pipe)
    pygame.draw.rect(screen, (245, 158, 11), bird)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,

  maze: `import pygame

pygame.init()
screen = pygame.display.set_mode((500, 380))
clock = pygame.time.Clock()

player = pygame.Rect(42, 42, 24, 24)
walls = [
    pygame.Rect(110, 16, 20, 240),
    pygame.Rect(230, 120, 20, 244),
    pygame.Rect(350, 16, 20, 250)
]
key_rect = pygame.Rect(290, 315, 22, 22)
door_rect = pygame.Rect(425, 45, 35, 40)
has_key = False
level_complete = False

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    old_x, old_y = player.x, player.y
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player.x -= 4
    if keys[pygame.K_RIGHT]: player.x += 4
    if keys[pygame.K_UP]:    player.y -= 4
    if keys[pygame.K_DOWN]:  player.y += 4

    if player.collidelist(walls) != -1:
        player.x, player.y = old_x, old_y
    if player.colliderect(key_rect):
        has_key = True
    if player.colliderect(door_rect) and has_key:
        level_complete = True

    screen.fill((11, 16, 24))
    for w in walls:
        pygame.draw.rect(screen, (51, 65, 85), w)
    if not has_key:
        pygame.draw.rect(screen, (245, 158, 11), key_rect)
    pygame.draw.rect(screen, (34, 197, 94) if has_key else (239, 68, 68), door_rect)
    pygame.draw.rect(screen, (56, 189, 248), player)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,

  asteroids: `import pygame, random

pygame.init()
screen = pygame.display.set_mode((500, 380))
clock = pygame.time.Clock()

ship = pygame.Rect(235, 335, 30, 30)
rocks = [
    {"x": random.randint(25, 475), "y": random.randint(-380, -20), "r": random.randint(12, 20), "spd": random.uniform(2.5, 5.0)}
    for _ in range(6)
]
dodged = 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        ship.x = max(10, ship.x - 6)
    if keys[pygame.K_RIGHT]:
        ship.x = min(460, ship.x + 6)

    for rock in rocks:
        rock["y"] += rock["spd"]
        if rock["y"] > 385:
            rock["y"] = random.randint(-120, -20)
            rock["x"] = random.randint(25, 475)
            rock["r"] = random.randint(12, 20)
            rock["spd"] = random.uniform(2.5, 5.0)
            dodged += 1

    screen.fill((11, 16, 24))
    pygame.draw.rect(screen, (45, 212, 191), ship)
    for rock in rocks:
        pygame.draw.circle(screen, (148, 163, 184), (int(rock["x"]), int(rock["y"])), rock["r"])
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`
};

