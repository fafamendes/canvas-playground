import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useCanvasContext } from "./CanvasContext"
import { GameObject } from "@/lib/canvas-engine"


export interface IPlayerContext {
  positionX: number
  positionY: number
  width: number
  height: number
  setPlayerPosition: (x: number, y: number) => void
  movePlayer: (x: number, y: number) => void
}

export interface IPlayerProviderProps {
  children: React.ReactNode
}

const PlayerContext = createContext({} as IPlayerContext)
export const usePlayerContext = () => useContext(PlayerContext)


export const PlayerProvider: React.FC<IPlayerProviderProps> = ({ children }) => {

  const { canvasWidth, canvasHeight, canvasEngine } = useCanvasContext()

  const [positionX, setPositionX] = useState(canvasWidth / 2)
  const [positionY, setPositionY] = useState(canvasHeight / 2)
  const [width, _setWidth] = useState(60)
  const [height, _setHeight] = useState(30)
  const [playerImageURL, _setPlayerImageURL] = useState('/assets/rocket.png')
  const playerObject = new GameObject(positionX, positionY, width, height, playerImageURL, 5)

  useEffect(() => {
    canvasEngine?.addGameObject(playerObject)
  }, [canvasEngine, playerObject])

  const setPlayerPosition = useCallback((x: number, y: number) => {
    setPositionX(x)
    setPositionY(y)
  }, [setPositionX, setPositionY])

  const movePlayer = useCallback((x: number, y: number) => {
    playerObject.move(x, y)
  }, [playerObject])

  return (
    <PlayerContext.Provider
      value={{
        positionX,
        positionY,
        setPlayerPosition,
        movePlayer,
        width,
        height
      }}
    >
      {children}
    </PlayerContext.Provider>
  )

}