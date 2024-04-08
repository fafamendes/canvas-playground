import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useCanvasContext } from "./CanvasContext"
import { GameObject } from "@/lib/canvas-engine"

export interface IBackgroundContext {
  positionX: number
  positionY: number
  width: number
  height: number
  backgroundURL: string
  moveBackground: (x: number, y: number) => void
  setBackgroundImageURL: (image: string) => void
  moveBackgroundTo: (x: number, y: number) => void
}

export interface IBackgroundProviderProps {
  children: React.ReactNode
}

const BackgroundContext = createContext<IBackgroundContext>({} as IBackgroundContext)

export const useBackgroundContext = () => useContext(BackgroundContext)

export const BackgroundProvider: React.FC<IBackgroundProviderProps> = ({ children }) => {

  const { canvasEngine, canvasWidth, canvasHeight } = useCanvasContext()

  const [width, setWidth] = useState(1280)
  const [height, setHeight] = useState(720)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [backgroundURL, setBackgroundImageURL] = useState<string>('/assets/background-island.jpg')

  const [backgroundObject, _setBackgroundObject] = useState(new GameObject(positionX, positionY, width, height, backgroundURL, 0))
  const [background2Object, _setBackground2Object] = useState(new GameObject(positionX + width, positionY, width, height, backgroundURL, 0))


  useEffect(() => {
    canvasEngine?.addGameObject(backgroundObject)
    canvasEngine?.addGameObject(background2Object)
  }, [canvasEngine, backgroundObject, background2Object])

  useCallback(() => {
    backgroundObject.setPosition(positionX, positionY)
    background2Object.setPosition(positionX + width, positionY)
  }, [backgroundObject, background2Object, positionX, positionY])

  const moveBackgroundTo = useCallback((x: number, y: number) => {
    backgroundObject.setPosition(x, y)
    background2Object.setPosition(x + width, y)
    setPositionX(x)
    setPositionY(y)
  }, [backgroundObject, background2Object, width])

  const moveBackground = useCallback((x: number, y: number) => {
    setPositionX(positionX => positionX + x)
    setPositionY(positionY => positionY + y)
    backgroundObject.move(x, y)
    background2Object.move(x, y)
  }, [backgroundObject, background2Object])

  useEffect(() => {
    if (-positionX > width) {
      console.log('Terminou')
      setPositionX(0)
      setPositionY(0)
      backgroundObject.setPosition(0, 0)
      background2Object.setPosition(width, 0)
    }
    backgroundObject.setPosition(positionX, positionY)
    background2Object.setPosition(positionX + width, positionY)
  }, [positionX, backgroundObject, background2Object, width])

  useEffect(() => {

    backgroundObject.setSize(width, height)
    background2Object.setSize(width, height)

  }, [backgroundObject, background2Object, height, width])


  useEffect(() => {
    setHeight(canvasHeight)
    setWidth(backgroundObject.width * canvasWidth / canvasHeight)
  }, [canvasHeight, canvasWidth, backgroundObject])

  return (
    <BackgroundContext.Provider
      value={{
        positionX,
        positionY,
        width,
        height,
        backgroundURL,
        moveBackground,
        setBackgroundImageURL,
        moveBackgroundTo
      }}
    >
      {children}
    </BackgroundContext.Provider>
  )
}
