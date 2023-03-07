type SelectOption = {
  value: string | number
  label: string
}

type DropdownProps = {
  options: SelectOption[]
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export const Dropdown = ({ value, onChange, options }: DropdownProps) => {
  return (
    <div className="absolute justify-center items-center">
      <div className="relative flex items-center w-80 h-full gap-2 p-2 border-2 rounded border-solid border-slate-400 outline-none focus:border-color-hsl(200, 100%,50%)">
        <span className="flex-grow">Value</span>
        <button className="text-slate-300 border-none outline-none cursor-pointer p-0 text-xl hover:text-slate-600">
          &times;
        </button>
        <div className="bg-slate-300 self-stretch w-0.5"></div>
        <div className="flex border-4 border-solid border-transparent border-t-slate-300 translate-y-1"></div>
        <ul className="absolute m-0 p-0 list-none max-h-60 overflow-y-auto border-2 border-solid border-slate-200 rounded w-full left-0 top-full mt-4 bg-red-100 z-[100]">
          {options.map((option) => (
            <li className="px-1 py-2" key={option.value}>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
