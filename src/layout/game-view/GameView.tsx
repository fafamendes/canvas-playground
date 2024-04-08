import { useCanvasContext } from "@/context/CanvasContext"


export interface IGameViewProps {
  width: number
  height: number
}


export const Gameview: React.FC<IGameViewProps> = ({ width, height }) => {

  const { canvasRef, canvasWidth, canvasHeight } = useCanvasContext()

  return (
    <div style={{ width, height }}
      className="bg-slate-50">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </div>
  )

}