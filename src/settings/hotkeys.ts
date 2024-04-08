
import { useHotkeys } from "react-hotkeys-hook"

export interface IHotkeys {
  setAxisX: (value: number) => void
  setAxisY: (value: number) => void
  setAcceleration: (value: number) => void
  setAttack: (value: boolean) => void
  setDefense: (value: boolean) => void
  setSpecial: (value: boolean) => void
  setCancel: (value: boolean) => void
  setEsc: (value: boolean) => void
}

export const setHotKeys = ({ setAxisX, setAxisY, setAcceleration, setAttack, setDefense, setSpecial, setCancel, setEsc }: IHotkeys) => {

  useHotkeys("w", () => setAxisY(1), { keydown: true })
  useHotkeys("w", () => setAxisY(0), { keyup: true })

  useHotkeys("s", () => setAxisY(-1), { keydown: true })
  useHotkeys("s", () => setAxisY(0), { keyup: true })

  useHotkeys("a", () => setAxisX(-1), { keydown: true })
  useHotkeys("a", () => setAxisX(0), { keyup: true })

  useHotkeys("d", () => setAxisX(1), { keydown: true })
  useHotkeys("d", () => setAxisX(0), { keyup: true })

  useHotkeys("space", () => setAttack(true), { keydown: true })
  useHotkeys("space", () => setAttack(false), { keyup: true })

  useHotkeys("j", () => setAcceleration(1), { keydown: true })
  useHotkeys("j", () => setAcceleration(0), { keyup: true })

  useHotkeys("k", () => setDefense(true), { keydown: true })
  useHotkeys("k", () => setDefense(false), { keyup: true })

  useHotkeys("l", () => setSpecial(true), { keydown: true })
  useHotkeys("l", () => setSpecial(false), { keyup: true })

  useHotkeys("x", () => setCancel(true), { keydown: true })
  useHotkeys("x", () => setCancel(false), { keyup: true })

  useHotkeys("escape", () => setEsc(true), { keydown: true })
  useHotkeys("escape", () => setEsc(false), { keyup: true })
}