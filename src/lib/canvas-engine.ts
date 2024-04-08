

export class CanvasEngine {
  private canvas: HTMLCanvasElement
  private gameObjects: GameObject[] = []

  public ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  public getWidth() {
    return this.canvas.width
  }

  public getHeight() {
    return this.canvas.height
  }

  public setDimensions(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  public addGameObject(gameObject: GameObject) {
    console.log('Adding game object', gameObject)
    this.gameObjects.push(gameObject)
  }

  public removeGameObject(gameObject: GameObject) {
    const index = this.gameObjects.indexOf(gameObject)
    if (index > -1) {
      this.gameObjects.splice(index, 1)
    }
  }

  public draw() {
    const orderedGameObjects = this.gameObjects.sort((a, b) => {
      return a.zIndex - b.zIndex
    })
    this.clear()
    console.log(orderedGameObjects)
    orderedGameObjects.forEach((gameObject) => {
      if (gameObject.image.complete) {
        this.ctx.drawImage(gameObject.image, gameObject.positionX, gameObject.positionY, gameObject.width, gameObject.height)
      } else {
        gameObject.image.onload = () => {
          this.ctx.drawImage(gameObject.image, gameObject.positionX, gameObject.positionY, gameObject.width, gameObject.height)
        }
      }
    })
  }

}

export class GameObject {


  public imageURL: string
  public positionX: number
  public positionY: number
  public width: number
  public height: number
  public image: HTMLImageElement
  public zIndex: number

  constructor(positionX: number, positionY: number, width: number, height: number, imageURL: string, zIndex: number) {
    this.positionX = positionX
    this.positionY = positionY
    this.width = width
    this.height = height
    this.imageURL = imageURL
    this.zIndex = zIndex
    this.image = new Image()

    this.loadImage()
  }


  private loadImage() {
    this.image.src = this.imageURL
  }


  public move(x: number, y: number) {
    console.log('Moving game object', x, y)
    this.positionX += x
    this.positionY += -y
  }

  public setPosition(x: number, y: number) {
    this.positionX = x
    this.positionY = y
  }

  public setSize(width: number, height: number) {
    this.width = width
    this.height = height
  }

  public setImageURL(imageURL: string) {
    this.imageURL = imageURL
  }

  public setZIndex(zIndex: number) {
    this.zIndex = zIndex
  }

}
