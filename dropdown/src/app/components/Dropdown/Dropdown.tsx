type SelectOption = {
  value: string
  label: string
}

type DropdownProps = {
  options?: SelectOption[]
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export const Dropdown = ({ value, onChange, options }: DropdownProps) => {
  return <div className="text-3xl font-bold underline">Dropdown</div>
}
