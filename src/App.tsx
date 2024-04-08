import { HotkeysProvider } from 'react-hotkeys-hook'
import './App.css'
import { CanvasProvider } from './context/CanvasContext'
import { ControllerProvider } from './context/ControllerContext'
import { Game } from './Game'
import { BackgroundProvider } from './context/BackgroundContext'
import { PlayerProvider } from './context/PlayerContext'
function App() {


  return (
    <HotkeysProvider>
      <ControllerProvider>
        <CanvasProvider>
            <BackgroundProvider>
              <PlayerProvider>
                <Game />
              </PlayerProvider>
            </BackgroundProvider>
        </CanvasProvider>
      </ControllerProvider>
    </HotkeysProvider>
  )
}

export default App
