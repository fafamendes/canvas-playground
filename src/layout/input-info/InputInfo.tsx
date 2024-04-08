import { IControllerActions, useControllerContext } from "@/context/ControllerContext"

export interface IInputInfo {
  extra?: string
}

export const InputInfo = ({ extra }: IInputInfo) => {

  const { payload } = useControllerContext()

  return (
    <div className="fixed absolute top-0 left-0 p-4 bg-[#ffffff]/10 text-white z-50">
      {Object.keys(payload).map((key) => {
        let value = payload[key as keyof IControllerActions]

        return <div className={`text-lg ${Boolean(value) && 'text-green-500'}`} key={key}>{key}: {value.toString()}</div>
      }
      )}
      <span>{extra}</span>
    </div>
  )
}