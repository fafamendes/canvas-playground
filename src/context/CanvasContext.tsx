import React, { useCallback, useContext, useEffect } from "react"
import { useRef } from "react"
import { CanvasEngine } from "@/lib/canvas-engine"

export interface ICanvasContext {
  setDimensions: (width: number, height: number) => void,
  canvasEngine: CanvasEngine | null
  canvasRef: React.RefObject<HTMLCanvasElement>
  canvasContext: CanvasRenderingContext2D | null
  canvasWidth: number
  canvasHeight: number
}

export interface ICanvasProviderProps {
  children: React.ReactNode
}

const CanvasContext = React.createContext<ICanvasContext>({} as ICanvasContext)

export const useCanvasContext = () => useContext(CanvasContext)

export const CanvasProvider: React.FC<ICanvasProviderProps> = ({
  children,
}) => {

  const [canvasWidth, _setCanvasWidth] = React.useState(1280)
  const [canvasHeight, _setCanvasHeight] = React.useState(720)


  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null)
  const [canvasEngine, setCanvasEngine] = React.useState<CanvasEngine | null>(null)
  const [canvasContext, _setCanvasContext] = React.useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasEngine(new CanvasEngine(canvasRef.current as HTMLCanvasElement)) 
    }
  }, [canvasRef])

  const setDimensions = useCallback((width: number, height: number) => {
    canvasEngine?.setDimensions(width, height)
  }, [canvasEngine])

  return (
    <CanvasContext.Provider
      value={{
        setDimensions,
        canvasEngine,
        canvasRef,
        canvasContext,
        canvasWidth,
        canvasHeight
      }}
    > {children}
    </CanvasContext.Provider>
  );
}