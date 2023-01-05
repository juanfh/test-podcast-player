
import { IconName } from "@fortawesome/fontawesome-svg-core"
import { Icon } from "./Icon"

export interface ButtonProps {
  icon?: IconName
  label?: string
  onClick?: () => void
}

export const Button = ({ icon, label, onClick }: ButtonProps) => {

  return (
    <button className={`focus:outline-none px-5 py-2 text-sm font-normal text-white rounded bg-fuchsia-700 hover:bg-fuchsia-900 transition-colors duration-300`} onClick={onClick} >
      <div className={`flex flex-nowrap min-w-max justify-center items-center ${(icon && label !== '') && "gap-1"}`}>
        {icon && <Icon icon={icon} />}
        {label && <div>{label}</div>}
      </div>
    </button>
  )
}
