
import { IconName } from "@fortawesome/fontawesome-svg-core"
import { Icon } from "./Icon"

export interface ButtonProps {
  format?: "button" | "link"
  icon?: IconName
  label?: string
  onClick?: () => void
}

export const ButtonContent = ({ icon, label }: ButtonProps) => {

  return (
    <div className={`flex flex-nowrap min-w-max justify-center items-center ${(icon && label !== '') && "gap-1"}`}>
      {icon && <Icon icon={icon} />}
      {label && <div>{label}</div>}
    </div>
  )
}

export const Button = ({ format = "button", icon, label, onClick }: ButtonProps) => {

  const className = "focus:outline-none px-5 py-2 text-sm font-normal text-white rounded bg-fuchsia-700 hover:bg-fuchsia-900 transition-colors duration-300"

  return (
    <>
      {format === "button" ? (
        <button className={className} onClick={onClick} >
          <ButtonContent icon={icon} label={label} />
        </button>
      ) : (
        <div className={className} onClick={onClick} >
          <ButtonContent icon={icon} label={label} />
        </div>
      )}
    </>

  )
}
