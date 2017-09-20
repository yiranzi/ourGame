// the game itself
var game;

// global object with game options
var gameOptions = {

    // width of the game, in pixels
    gameWidth: 640,
    gameHeight: 0,

    // tint colors to be applied to tiles
    tileColors: [0x00ff00, 0x00aa00],

    // number of tiles visible, works better if it's even, in this first prototype
    verticalTiles: 9
}

//原始物品列表
var placeList = [
    {
        id: 0,
        paddingId: 0,
        imgSrc: 'tile',
        posX: 300,
        posY: 400,
        colliderWidth: 200,
        colliderHeight: 200,
        imageWidth: 200,
        imageHeight: 200,
    },
    {
        id: 1,
        paddingId: 1,
        imgSrc: 'hero',
        posX: 70,
        posY: 450,
        colliderWidth: 100,
        colliderHeight: 100,
        imageWidth: 50,
        imageHeight: 50,

    },
]

var talkList = [
    {
        id: 0,
        talkDes: '这个看守真该死',
        posX: 0,
        posY: 0,
        width: 100,
        height: 100,
    },
    {
        id: 1,
        talkDes: '门上了锁.可恶.',
        posX: 100,
        posY: 100,
        width: 100,
        height: 100,
    },
    {
        id: 2,
        talkDes: '这里有公司的账本,我来好好看看',
        posX: 200,
        posY: 200,
        width: 100,
        height: 100,
    },
]

var itemList = [
    {
        id: 0,
        name: 'card',
        des: '一本书',
        getDes: '你找到了一个财神,也许可以把它糊到某个人脸上.',
        imgSrc: 'tile',
        posX: 400,
        posY: 600,
        width: 100,
        height: 100,
    },
    {
        id: 1,
        name: 'caishen',
        des: '一件衣服',
        getDes: '你找到了一个卡片,看起来和门有关',
        imgSrc: 'hero',
        posX: 50,
        posY: 650,
        width: 100,
        height: 100,
    },
]

var Config = {
    barDis: 100,
    barSize: 100,
}

//全局变量
var isDrag = false;
var DragIndex = -1;

//物品添加到的列表
var placeObj = [

]
var viewObj = [
]

var barObj = [
]
window.onload = function() {

    // determining window width and height
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;



    // if we are in ladscape mode, then set window height to fake a potrait mode
    if(windowWidth > windowHeight){
        windowHeight = windowWidth * 1.8;
    };

    // defining game height
    var gameHeight = windowHeight * gameOptions.gameWidth / windowWidth;


    // creation of the game istelf
    game = new Phaser.Game(gameOptions.gameWidth, gameHeight);
    Config.gameWidth = gameOptions.gameWidth;
    Config.gameHeight = gameHeight;

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
        game.load.image("barBox", './src/res/barBox.jpg');
        game.load.image("bg1", './src/res/bg1.jpg');
    },
    create: function(){
        game.state.start("PlayGame");
    }
}
var playGame = function(game){}
playGame.prototype = {
    create: function () {
        //初始化背景
        let bg1 = game.add.image(0,0,'bg1');
        bg1.width = Config.gameWidth;
        bg1.height = Config.gameHeight;

        //初始化bar列表
        this.barRenderGroup = game.add.group();
        this.barRenderGroup.x = 0;
        this.barRenderGroup.y = Config.gameHeight -100;
        let barBox = game.add.image(0,0, 'barBox');
        // barBox.anchor.set(0, 1);
        this.barRenderGroup.add(barBox);

        //初始化 将所有的物品..放置到场景上


        // viewObj = itemList;
        this.addViewItem(0);
        this.addViewItem(1);
        // this.viewPlaceList();
        this.renderBarList();

        //初始化放置区域
        this.addPlaceItem(0);
        this.addPlaceItem(1);

        //初始化对话区域




    },
    setSprite(x,y,width,height) {

    },
    clickItem(id) {
        console.log(id)
        //初始化,并且弹出说明框

        //从场景中删除,添加到物品栏中
        // let index = this.getIndex(viewObj, id);
        // if(index !== -1) {
        let deleteItem = this.deletIndex(viewObj,id);
        this.addBarItem(id);

        //打开说明
        let getDes = deleteItem.getDes;
        // console.log(getDes)
        alert(getDes)
        // barObj.push(deleteItem);
        // }
        //物品栏刷新
        this.renderBarList();
        // this.viewPlaceList();

        //页面元素刷新
    },

    //获得物品
    getItemById(array,id) {
        for(let i = 0; i < array.length; i++) {
            if(array[i].id === id) {

                let result = JSON.parse(JSON.stringify(array[i]))
                console.log('finish')
                return result;
            }
        }
        return {}
    },


    getIndex(array,value) {
        for(let i = 0; i < array.length; i++) {
            if(array[i].id === value) {
                return i
            }
        }
        return -1
    },

    update: function () {
        if(isDrag) {

        }
        // game.physics.arcade.collide(this.ground, this.sale_card);
        // console.log('123')
    },

    dragStart(id) {
        isDrag = true;
        DragIndex = id;
        console.log('dragStart')
    },
    dragStop(id,obj) {
        console.log(event);
        console.log(placeObj);
        //从背包中获取当前的物品
        let putObj = this.getItemById(itemList,id)
        let putCollider = obj;
        let getCollider;
        let getObj;
        // 没有正确放置
        let placeResult = false;
        //1遍历所有place
        for(let i = 0; i < placeObj.length; i++) {
            getObj = placeObj[i];
            getCollider = getObj.ref;
            game.physics.arcade.overlap(putCollider, getCollider, function () {
                if(putObj.id === getObj.paddingId) {
                    console.log('get' + getObj.paddingId);
                    placeResult = true;
                }
            }, null, this);
        }

        if(placeResult) {
            this.placeRight(id);
        } else {
            this.placeWrong(id);
        }
        // game.physics.arcade.collide(event, place);

        console.log('dragStart')
    },

    placeRight(id) {
        //1从背包中删除(maybe)
        console.log('placeRight')
        this.deletIndex(barObj, id);
        //2添加到图画中(maybe)
        let place = this.getItemById(placeList,id);
        let image = game.add.image(place.posX,place.posY,place.imgSrc);
        image.width = place.imageHeight;
        image.height = place.imageWidth;
        //3删除原区域
        this.deletIndex(placeObj, id);
        this.renderBarList();
    },

    placeWrong() {
        //1回归原位.
        this.renderBarList();
    },


    addPlaceItem(id) {
        let item = this.getItemById(placeList,id);
        let placeItem = game.add.sprite(item.posX, item.posY, '');
        game.physics.arcade.enable(placeItem);
        placeItem.width =  item.colliderWidth;
        placeItem.height =  item.colliderHeight;

        placeItem.inputEnabled = true;
        // placeItem.events.onInputDown.add(this.clickItem.bind(this, item.id), this);
        item.ref = placeItem;
        placeObj.push(item);
    },

    viewPlaceList() {
        for( let i = 0; i < viewObj.length; i++) {
            let item = viewObj[i];
            let placeItem = game.add.sprite(item.posX, item.posY, item.imgSrc);
            game.physics.arcade.enable(placeItem);
            placeItem.inputEnabled = true;
            placeItem.width = item.width;
            placeItem.height = item.height;
            placeItem.events.onInputDown.add(this.clickItem.bind(this, item.id), this);
            //绑定
            viewObj[i].ref = placeItem;
        }
    },

    addViewItem(id) {
        let item = this.getItemById(itemList,id);
        let placeItem = game.add.sprite(item.posX, item.posY, item.imgSrc);
        game.physics.arcade.enable(placeItem);
        placeItem.width =  item.width;
        placeItem.height =  item.height;

        placeItem.inputEnabled = true;
        placeItem.events.onInputDown.add(this.clickItem.bind(this, item.id), this);
        item.ref = placeItem;
        viewObj.push(item);
    },

    //删除
    deletIndex(array,value) {
        for(let i = 0; i < array.length; i++) {
            if(array[i].id === value) {
                let result = array.splice(i, 1);
                if(result.length !== 0) {
                    result[0].ref.kill();
                    return result[0];
                } else {
                    return -1;
                }
            }
        }
        return -1
    },

    //添加物品
    addBarItem(id) {
        let item = this.getItemById(itemList,id);
        let placeItem = game.add.sprite(0, 0, item.imgSrc);
        game.physics.arcade.enable(placeItem);
        placeItem.inputEnabled = true;
        placeItem.width =  Config.barSize;
        placeItem.height =  Config.barSize;
        this.barRenderGroup.add(placeItem);

        placeItem.inputEnabled = true;
        placeItem.input.enableDrag();
        placeItem.input.bringToTop = true;
        placeItem.events.onDragStart.add(this.dragStart.bind(this, id));
        placeItem.events.onDragStop.add(this.dragStop.bind(this, id));

        item.ref = placeItem;
        barObj.push(item);
    },

    //排序背包
    renderBarList() {
        for( let i = 0; i < barObj.length; i++) {
            let renderItem = barObj[i].ref;
            renderItem.x = i * Config.barDis;
            renderItem.y = 0
        }
    },


    // getPos(pos) {
    //     return pos * this.tileSize;
    // },
    //
    // moveMyHero: function (e) {
    //     if(!this.canMove) {
    //         return
    //     }
    //     this.canMove = false;
    //     this.heroMoveTween.timeline = [];
    //     this.pos.x = e.position.x;
    //     this.pos.y = e.position.y;
    //     this.heroMoveTween.to({
    //         x: this.pos.x,
    //         y:this.pos.y,
    //     },500,Phaser.Easing.Linear.None);
    //     this.heroMoveTween.start();
    //
    // }

}
