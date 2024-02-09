namespace SpriteKind {
    export const Power = SpriteKind.create()
    export const Money = SpriteKind.create()
    export const Life = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Money, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(30)
})
info.onScore(60, function () {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.x += 5
    sprite.y += 5
    otherSprite.x += -5
    otherSprite.y += -5
})
function start_game () {
    for (let shark of sharks) {
        shark.follow(nemo, 50)
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Life, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(10)
})
info.onLifeZero(function () {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Power, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprite.setFlag(SpriteFlag.Ghost, true)
    pause(5000)
    sprite.setFlag(SpriteFlag.Ghost, false)
})
function setup_game () {
    info.setLife(3)
    info.setScore(0)
    scene.setBackgroundImage(assets.image`pond`)
    nemo = sprites.create(assets.image`nemo`, SpriteKind.Player)
    controller.moveSprite(nemo, 100, 100)
    nemo.setStayInScreen(true)
    sharks = [sprites.create(assets.image`shark1`, SpriteKind.Enemy), sprites.create(assets.image`shark2`, SpriteKind.Enemy), sprites.create(assets.image`shark3`, SpriteKind.Enemy)]
    sharks[0].setPosition(26, 22)
    sharks[1].setPosition(122, 41)
    sharks[2].setPosition(36, 103)
    powerups = [sprites.create(assets.image`coin`, SpriteKind.Money), sprites.create(assets.image`heart`, SpriteKind.Life), sprites.create(assets.image`star`, SpriteKind.Power)]
    powerups[0].setPosition(83, 11)
    powerups[1].setPosition(28, 69)
    powerups[2].setPosition(123, 95)
}
let powerups: Sprite[] = []
let nemo: Sprite = null
let sharks: Sprite[] = []
setup_game()
pause(1000)
start_game()
game.onUpdateInterval(1000, function () {
    info.changeScoreBy(1)
})
