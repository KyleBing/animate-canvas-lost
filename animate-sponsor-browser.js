/**
 * 心动
 * Animated Heart Canvas
 * @author: KyleBing(kylebing@163.com)
 * @github: https://github.com/KyleBing/animate-heart-canvas
 * @date-init: 2023-02-21
 * @date-update: 2023-02-23
 * @version: v0.1.9
 * @platform: NPM
 */

class AnimateHeartCanvas {
    /**
     * @param hMin 颜色 h 最小值
     * @param hMax 颜色 h 最大值
     * @param countHeart 心的数量
     * @param sizeMin 心形最小值
     * @param sizeMax 心形最大值
     * @param bgColor 背景颜色
     */
    constructor(hMin, hMax, countHeart = 150, sizeMin = 50, sizeMax = 350, bgColor) {
        this.isPlaying = true // 默认自动播放

        this.mouseX = 0
        this.mouseY = 0
        this.step = 0.005

        this.configFrame = {
            width : 1200,
            height: 300,
            bgColor: bgColor
        }
        this.timeLine = 0

        this.init()

        this.lastPosition = []

        window.onresize = () => {
            this.configFrame.height = innerHeight * 2
            this.configFrame.width = innerWidth * 2
            let heartLayer = document.getElementById('heartLayer')
            this.updateFrameAttribute(heartLayer)
        }
    }

    play(){
        if (this.isPlaying){

        } else {
            this.isPlaying = true
            this.draw()
        }
    }
    stop(){
        this.isPlaying = false
    }

    destroy(){
        this.isPlaying = false
        let heartLayer = document.getElementById('heartLayer')
        heartLayer.remove()
        console.log('动画已停止')
    }

    updateFrameAttribute(heartLayer){
        heartLayer.setAttribute('id', 'heartLayer')
        heartLayer.setAttribute('width', this.configFrame.width)
        heartLayer.setAttribute('height', this.configFrame.height)
        heartLayer.style.width = `${this.configFrame.width / 2}px`
        heartLayer.style.height = `${this.configFrame.height / 2}px`
        heartLayer.style.zIndex = '-3'
        heartLayer.style.userSelect = 'none'
        heartLayer.style.position = 'fixed'
        heartLayer.style.top = '0'
        heartLayer.style.left = '0'
    }


    init(){
        this.configFrame.height = innerHeight * 2
        this.configFrame.width = innerWidth * 2

        let heartLayer = document.createElement("canvas")
        this.updateFrameAttribute(heartLayer)
        document.documentElement.append(heartLayer)

        this.draw()

        document.documentElement.addEventListener('mousemove', event => {
            this.mouseX = event.x
            this.mouseY = event.y
        })
    }

    // 判断鼠标跟 box 的距离
    isMouseIsCloseToBox(box){
        let distance = Math.sqrt(Math.pow(Math.abs(box.position.x / 2 - this.mouseX),2) + Math.pow(Math.abs(box.position.y /2  - this.mouseY), 2))
        return distance < 100
    }


    draw() {
        this.timeLine = this.timeLine + 1
        // create heart
        let canvasHeart = document.getElementById('heartLayer')
        let ctx = canvasHeart.getContext('2d')


        // ctx.clearRect(0, 0, this.configFrame.width, this.configFrame.height)
        ctx.strokeStyle = 'red'
        ctx.fillStyle = 'blue'
        ctx.lineWidth = 5

        ctx.font = '20px sans-serf'

        let pos = randomPosition(this.configFrame.width, this.configFrame.height)
        console.log(pos)
        ctx.beginPath()
        if (this.lastPosition && this.lastPosition.length > 0){
            ctx.moveTo(...this.lastPosition)
        } else {

        }
        ctx.moveTo(...pos)
        this.lastPosition = pos
        ctx.fillText(`${pos}`, ...pos)
        ctx.stroke()

        if (this.isPlaying) {
            window.requestAnimationFrame(() => {
                this.draw()
            })
        }
    }
}


/**
 * 输出随机 1 或 -1
 * @returns {number}
 */
function randomDirection(){
    let random = Math.random()
    if (random > 0.5){
        return 1
    } else {
        return -1
    }
}

function randomPosition(width, height){
    return [
        Number((width * Math.random()).toFixed(0)),
        Number((height * Math.random()).toFixed(0))
    ]
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function randomInt(min, max){
    return Number((Math.random() * (max - min) + min).toFixed(0))
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function randomFloat(min, max){
    return Number(Math.random() * (max - min) + min)
}
