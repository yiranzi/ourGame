// the game itself
var game;

// global object with game options
var gameOptions = {

    // width of the game, in pixels
    gameWidth: 640,

    // tint colors to be applied to tiles
    tileColors: [0x00ff00, 0x00aa00],

    // number of tiles visible, works better if it's even, in this first prototype
    verticalTiles: 9
}

var babyGameOptions = {
    verticalTiles: 9,
    widthTiles: 3,
}
window.onload = function() {

    // determining window width and height
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // if we are in ladscape mode, then set window height to fake a potrait mode
    if(windowWidth > windowHeight){
        windowHeight = windowWidth * 1.8;
    }

    // defining game height
    var gameHeight = windowHeight * gameOptions.gameWidth / windowWidth;
    // var gameHeight = windowHeight * gameOptions.gameWidth / windowWidth;

    // creation of the game istelf
    game = new Phaser.Game(gameOptions.gameWidth, gameHeight);

    // game states
    game.state.add("PreloadGame", preloadGame);
    game.state.add("PlayGame", playGame);
    game.state.start("PreloadGame");
}
var preloadGame = function(game){}
preloadGame.prototype = {
    preload: function(){

        // making the game cover the biggest window area possible while showing all content
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.disableVisibilityChange = true;
        game.load.image("tile", './src/title.png');
        game.load.image("hero", './src/hero.png');
    },
    create: function(){
        game.state.start("PlayGame");
    }
}
var playGame = function(game){}
playGame.prototype = {
    setSprite(x,y,width,height) {

    },
    create: function () {
        //map
        this.tileSize = 100;

        //
        this.moveStep = 0;

        let offsetX = (game.width - this.tileSize * babyGameOptions.widthTiles) / 2;
        let offsetY = (game.height - this.tileSize * babyGameOptions.verticalTiles) / 2;
        let _this = this;

        // amount of placed tiles, useful to tint even/odd tiles with different colors
        var placedTiles = 0;
        //sun

        //居中
        // horizontal offset to keep tiles centered in the game
        // var offsetX = (game.width - this.tileSize * 3) / 2;

        //group which will contain all tiles

        //render bg

        //render bar

        //render obj
        let obj1 = game.add.sprite(0,0,"tile");
        obj1.width = 100;
        obj1.height = 100;
        game.physics.enable(obj1)obj1.
        obj1.events.on


        this.tileGroup = game.add.group();
        this.tileGroup.x = offsetX
        this.tileGroup.y = 0
        this.tileGroupTween = game.add.tween(this.tileGroup).to({
            y: this.tileSize
        }, 100, Phaser.Easing.Linear.None);

        this.tileArray = [];
        for( let i = 0; i < babyGameOptions.widthTiles; i++) {
            this.tileArray[i] = [];
            for( let j = 0; j < babyGameOptions.verticalTiles; j++) {
                // console.log(i + '/' + j)
                let tile = game.add.sprite(i * this.tileSize,j * this.tileSize,"tile");
                tile.width = this.tileSize
                tile.height = this.tileSize
                this.tileGroup.add(tile)
                tile.anchor.set(0, 1);
                this.tileArray[i][j] = tile;
            }

        }

        this.tileGroupTween.onComplete.add(function () {
            _this.tileGroup.y = 0;
            console.log(_this.tileGroup.y)
            console.log(_this.myHero.y)
            //y 加上去
            _this.tileGroup.forEach(function (child) {
                child.y += _this.tileSize;
            }, _this);
            let step = _this.moveStep % babyGameOptions.verticalTiles;
            for( let i = 0; i< babyGameOptions.widthTiles; i++) {
                _this.tileArray[i][babyGameOptions.verticalTiles -1 - step].y -=  babyGameOptions.verticalTiles * _this.tileSize
            }
            _this.moveStep++;

        })




        let startButton = game.add.button(0,0,"tile",function () {
            _this.tileGroupTween.start();
        });




        this.pos = {
            x: 1,
            y: 2,
        }
        this.canMove = true;
        this.myHero = game.add.sprite(this.tileGroup.x + this.getPos(this.pos.x),this.getPos(this.pos.y),"hero");
        this.myHero.width  = this.tileSize;
        this.myHero.height  = this.tileSize;
        this.getPos();
        // this.tileGroup.add(this.myHero);

        // // this.hero = game.add.sprite(0,0,"hero")
        // let _this = this;
        // this.heroMoveTween = game.add.tween(this.hero);
        // game.input.onDown.add(this.moveMyHero, this);
        //
        // this.heroMoveTween.onComplete.add(function () {
        //     _this.canMove = true;
        //     console.log('123');
        //     console.log(_this.pos.x)
        // })

    },
    getPos(pos) {
        return pos * this.tileSize;
    },

    moveMyHero: function (e) {
        if(!this.canMove) {
            return
        }
        this.canMove = false;
        this.heroMoveTween.timeline = [];
        this.pos.x = e.position.x;
        this.pos.y = e.position.y;
        this.heroMoveTween.to({
            x: this.pos.x,
            y:this.pos.y,
        },500,Phaser.Easing.Linear.None);
        this.heroMoveTween.start();

    }

}
playGame.prototypeTest = {
    create: function(){
        console.log('123')

        // useful to count travelled distance
        //计算距离的变量
        this.moves = 0;

        //平分单元格
        // determining tile size, according to game height and the amount of vertical tiles we want
        this.tileSize = game.height / gameOptions.verticalTiles;

        // amount of placed tiles, useful to tint even/odd tiles with different colors
        var placedTiles = 0;

        //居中
        // horizontal offset to keep tiles centered in the game
        var offsetX = (game.width - this.tileSize * 3) / 2;

        // array which will contain all tiles
        this.tileArray = [];

        // group which will contain all tiles
        this.tileGroup = game.add.group();

        // placing the group to have tiles centered in the game
        this.tileGroup.x = offsetX;
        this.tileGroup.y = 0;

        // creation of a tween which will scroll the terrain down by one tile
        this.tileTween = game.add.tween(this.tileGroup).to({
            y: this.tileSize
        }, 1000, Phaser.Easing.Linear.None);

        // since the endless runner thing is a fake, once we moved the terrain down by a tile
        // we reset its position, then move the lowest tiles to the top, giving the idea of an
        // infinite terrain
        this.tileTween.onComplete.add(function(){
            this.tileGroup.y = 0;
            // this.tileGroup.forEach(function(child){
            //     child.y += this.tileSize;
            // }, this);
            // for(var i = 0; i < 3; i++){
            //     this.tileArray[this.moves % this.tileArray.length][i].y -= (gameOptions.verticalTiles + 1) * this.tileSize
            // }
            // this.moves ++;
        }, this);

        // placing and tinting terrain tiles
        for(var i = 0; i < gameOptions.verticalTiles + 1; i ++){
            this.tileArray[i] = [];
            for(var j = 0; j < 3; j ++){
                var tile = game.add.sprite(j * this.tileSize, game.height - i * this.tileSize, "tile");
                tile.anchor.set(0, 1);
                tile.width = this.tileSize;
                tile.height = this.tileSize;
                tile.tint = gameOptions.tileColors[placedTiles % 2];
                this.tileGroup.add(tile);
                this.tileArray[i][j] = tile;
                placedTiles ++;
            }
        }

        // column numvers ramge from 0 to 2. Hero starts at column 1, the one in the middle
        this.heroColumn = 1;

        // at the moment the hero can move
        this.heroCanMove = true;

        // adding and sizing hero sprite
        //设定初始坐标
        this.hero = game.add.sprite(this.tileGroup.x + this.tileSize, game.height - 2 * this.tileSize, "hero");
        this.hero.width = this.tileSize;
        this.hero.height = this.tileSize;
        this.hero.anchor.set(0, 1);

        // tween to move the sprite
        this.heroTween = game.add.tween(this.hero);

        // callback function to be called once the tween is complete
        this.heroTween.onComplete.add(function(){
            this.heroCanMove = true;
            this.hero.x = this.tileGroup.x + this.tileSize * this.heroColumn;
            // this.heroWrap.visible = false;
        }, this);

        // and this is the second hero sprite, the one we will use to create the wrap effect
        //创建替身= =?
        this.heroWrap = game.add.sprite(this.tileGroup.x + this.tileSize, game.height - 2 * this.tileSize, "hero");
        this.heroWrap.width = this.tileSize;
        this.heroWrap.height = this.tileSize;
        this.heroWrap.anchor.set(0, 1);
        this.heroWrap.visible = false;
        this.heroWrapTween = game.add.tween(this.heroWrap);

        // mask to hide both hero and wrapHero once outside the path of tiles
        var mask = game.add.graphics(this.tileGroup.x, this.tileGroup.y);
        mask.beginFill(0xffffff);
        mask.drawRect(0, 0, this.tileSize * 3, game.height);
        this.hero.mask = mask;
        this.heroWrap.mask = mask;

        // waiting for player input
        game.input.onDown.add(this.moveHero, this);
    },
    moveHero: function(e){

        // can the hero move?
        if(this.heroCanMove){

            // start the tween which moves the terrain
            this.tileTween.start();

            // the hero can't move at the moment
            this.heroCanMove = false;

            // setting hero direction to left if the player clicked/touched the left half of the canvas, or right otherwise
            var direction = e.position.x < game.width / 2 ? -1 : 1;

            // calculating hero next column
            var nextColumn = Phaser.Math.wrap(this.heroColumn + direction, 0, 3);

            // setting hero tween timeline to an empty array to prevent adding waypoints with "to" method
            this.heroTween.timeline = [];

            // new hero destination
            this.heroTween.to({
                x: this.hero.x + this.tileSize * direction
            }, 1000, Phaser.Easing.Cubic.InOut, true);

            // this is the case with the wrapping hero coming into play
            if(Math.abs(nextColumn - this.heroColumn) != 1){
                // making it visible
                this.heroWrap.visible = true;

                // placing it outside the final column
                this.heroWrap.x = nextColumn == 0 ? this.tileGroup.x - this.tileSize: this.tileGroup.x + 3 * this.tileSize;

                // resetting tween timeline
                // this.heroWrapTween.timeline = [];

                // finally making the wrap hero move
                this.heroWrapTween.to({
                    x: this.heroWrap.x + this.tileSize * direction
                }, 100, Phaser.Easing.Cubic.InOut, true);

            }
            this.heroColumn = nextColumn;
        } else {
        }
    }
}