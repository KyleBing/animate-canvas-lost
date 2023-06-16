/**
 * 迷离
 * Lost
 * @author: KyleBing(kylebing@163.com)
 * @github: https://github.com/KyleBing/animate-canvas-lost
 * @date-init: 2023-06-16
 * @date-update: 2023-06-16
 * @version: v0.0.1
 * @platform: NPM
 */

class AnimateLostBrowser {
    /**
     *
     * @param title             string 自定义点位的标题，默认为屏幕坐标值
     * @param titleFontSize     number 标题文字大小
     * @param isShowLine        number 1 画线 0 不画线
     * @param isShowTitle       number 1 显示标题 0 不显示标题
     * @param lineWidth         number 线条宽度 默认：2
     * @param bgColor           string 背景颜色 RGB 等颜色格式均可
     */
    constructor(title, titleFontSize, isShowLine, isShowTitle, lineWidth, bgColor) {
        this.isPlaying = true // 默认自动播放

        this.mouseX = 0
        this.mouseY = 0

        this.frame = {
            width : 1200,
            height: 300,
        }

        this.timeLine = 0

        this.bgColor = bgColor || 'black'
        this.title = title
        this.titleFontSize = titleFontSize || 20
        this.isShowLine = isShowLine !== '0'
        this.isShowTitle = isShowTitle !== '0'
        this.lineWidth = Number(lineWidth) || 2

        this.init()

        this.lastPosition = [] // 上一个点的位置

        window.onresize = () => {
            this.frame.height = innerHeight * 2
            this.frame.width = innerWidth * 2
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
        heartLayer.setAttribute('width', this.frame.width)
        heartLayer.setAttribute('height', this.frame.height)
        heartLayer.style.width = `${this.frame.width / 2}px`
        heartLayer.style.height = `${this.frame.height / 2}px`
        heartLayer.style.zIndex = '-3'
        heartLayer.style.userSelect = 'none'
        heartLayer.style.position = 'fixed'
        heartLayer.style.top = '0'
        heartLayer.style.left = '0'
    }


    init(){
        this.frame.height = innerHeight * 2
        this.frame.width = innerWidth * 2

        let heartLayer = document.createElement("canvas")
        this.updateFrameAttribute(heartLayer)
        document.documentElement.append(heartLayer)

        this.draw()

        // fill background
        let canvasHeart = document.getElementById('heartLayer')
        let ctx = canvasHeart.getContext('2d')
        ctx.fillStyle = this.bgColor
        ctx.rect(0,0,this.frame.width, this.frame.height)
        ctx.fill()

        document.documentElement.addEventListener('mousemove', event => {
            this.mouseX = event.x
            this.mouseY = event.y
        })
    }



    draw() {
        this.timeLine = this.timeLine + 1
        // create heart
        let canvasHeart = document.getElementById('heartLayer')
        let ctx = canvasHeart.getContext('2d')

        // ctx.clearRect(0, 0, this.frame.width, this.frame.height)
        // ctx.strokeStyle = 'red'
        let currentColor = getColor(this.timeLine)
        ctx.strokeStyle = currentColor
        ctx.lineWidth = this.lineWidth

        let pos = randomPosition(this.frame.width, this.frame.height) // 新的随机位置

        if (this.isShowLine){
            ctx.beginPath()
            if (this.lastPosition && this.lastPosition.length > 0){
                ctx.moveTo(...this.lastPosition)
            } else {
            }
            ctx.lineTo(...pos)
            ctx.stroke()
        }

        this.lastPosition = pos

        if (this.isShowTitle){
            ctx.fillStyle = currentColor
            ctx.font = `${this.titleFontSize}px sans-serf`
            ctx.fillText(`${this.title || pos}`, ...pos)
        }

        // 显示时间标线序号
        ctx.fillStyle = 'black'
        ctx.font = '20px sans-serf'
        ctx.clearRect(10, this.frame.height - 53, 100, 30)
        ctx.fillText(`${this.timeLine}`, 20, this.frame.height - 30)

        if (this.isPlaying) {
            window.requestAnimationFrame(() => {
                this.draw()
            })
        }
    }
}

function getColor(timeLine){
    return `hsla(${timeLine%360},100%,50%,1)`
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
