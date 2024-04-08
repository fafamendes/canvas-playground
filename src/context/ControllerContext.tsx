import { setHotKeys } from "@/settings/hotkeys"
import { createContext, useContext, useEffect, useState } from "react"


export interface IControllerActions {
  axisX: number
  axisY: number
  attack: boolean
  acceleration: number
  defense: boolean
  special: boolean
  cancel: boolean
  esc: boolean
}
export interface IControllerContext extends IControllerActions {
  payload: IControllerActions
}

export interface IControllerProviderProps {
  children: React.ReactNode
}

const ControllerContext = createContext<IControllerContext>({} as IControllerContext)

export const useControllerContext = () => useContext(ControllerContext)


export const ControllerProvider: React.FC<IControllerProviderProps> = ({ children }) => {

  const [axisX, setAxisX] = useState(0)
  const [axisY, setAxisY] = useState(0)
  const [acceleration, setAcceleration] = useState(0)
  const [attack, setAttack] = useState(false)
  const [defense, setDefense] = useState(false)
  const [special, setSpecial] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [esc, setEsc] = useState(false)
  const [payload, setPayload] = useState<IControllerActions>({
    axisX,
    axisY,
    acceleration,
    attack,
    defense,
    special,
    cancel,
    esc
  })

  setHotKeys({ setAxisX, setAxisY, setAcceleration, setAttack, setDefense, setSpecial, setCancel, setEsc })

  useEffect(() => {
    setPayload({
      axisX,
      axisY,
      attack,
      acceleration,
      defense,
      special,
      cancel,
      esc
    })
  }, [axisX, axisY, attack,acceleration, defense, special, cancel, esc])

  return (
    <ControllerContext.Provider
      value={{
        axisX,
        axisY,
        attack,
        acceleration,
        defense,
        special,
        cancel,
        esc,
        payload,
      }}
    >
      {children}
    </ControllerContext.Provider>
  )
}