import { useEffect, useState } from "react"
import { Gameview } from "./layout/game-view/GameView"
import { Button } from '@/components/ui/button'
import { useCanvasContext } from "./context/CanvasContext"
import { InputInfo } from "./layout/input-info/InputInfo"
import { useBackgroundContext } from "./context/BackgroundContext"
import { usePlayerContext } from "./context/PlayerContext"
import { useControllerContext } from "./context/ControllerContext"


export const Game = () => {
  const { canvasEngine } = useCanvasContext()
  const { movePlayer } = usePlayerContext()
  const { moveBackground, setBackgroundImageURL } = useBackgroundContext()
  const { payload } = useControllerContext()

  const [started, setStarted] = useState(false)
  const [frames, setFrames] = useState(0)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)


  useEffect(() => {
    moveBackground(-16, 0)
    movePlayer(payload.axisX * 8, payload.axisY * 8)
    canvasEngine?.draw()
  }, [payload, frames])

  useEffect(() => {
    setBackgroundImageURL('/assets/background-sky.jpg')
  }, [])


  useEffect(() => {
    if (started && !intervalId) {
      const intervalId = setInterval(() => {
        setFrames(frames => frames + 1)
      }, 1000 / 60)
      setIntervalId(intervalId)
    }
  }, [started])

  return (
    <div className="bg-slate-800 h-screen flex items-center justify-center flex-col gap-12">
      <Gameview
        width={1280}
        height={720}
      />
      <div className='flex gap-4 justify-center'>
        <Button onClick={() => setStarted(true)} className={`${started ? 'bg-yellow-500 hover:bg-yellow-500/80' : 'bg-green-500 hover:bg-green-500/80'}`}>{started ? 'Reset' : 'Start'}</Button>
        <Button disabled={!started} className="bg-red-500 hover:bg-red-500/80" >Stop</Button>
      </div>
      <span className="text-red-500">Botões não funcionam!</span>

      <InputInfo />

    </div>
  )
}
