'use client'

import { useEffect, useRef, useState } from 'react'

export type SelectOption = {
  label: string
  value: string | number
}
type MultipleSelectprops = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
  onClick?: () => void
}
type SingleSelectprops = {
  multiple?: false
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
  onClick?: () => void
}
type DropdownProps = {
  options: SelectOption[]
} & (SingleSelectprops | MultipleSelectprops)

export const Dropdown = ({ multiple, value, onChange, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlihtedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((item) => item !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option != value) onChange(option)
    }
  }
  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option == value
  }
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target != containerRef.current) return
      switch (event.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev)
          if (isOpen) selectOption(options[highlihtedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          const newValue = highlihtedIndex + (event.code === 'ArrowDown' ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          break
      }
    }
    containerRef.current?.addEventListener('keydown', handler)

    return () => {
      containerRef.current?.removeEventListener('keydown', handler)
    }
  }, [isOpen, highlihtedIndex, options])

  return (
    <div
      ref={containerRef}
      className="absolute justify-center items-center"
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}>
      <div className="relative flex items-center w-80 h-full gap-2 p-2 border-2 rounded border-solid border-slate-400 outline-none focus:border-blue-600">
        <span className="flex flex-wrap flex-grow  gap-2">
          {multiple
            ? value.map((item) => (
                <button
                  className="flex items-center border-2 rounded border-solid border-slate-400 py-1 px-[0.5rem] gap-2 cursor-pointer outline-none bg-none hover:bg-slate-200 text-slate-700 "
                  key={item.value}
                  onClick={(event: any) => {
                    event.stopPropagation()
                    selectOption(item)
                  }}>
                  {item.label}
                  <span className=""> &times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={(event) => {
            event.stopPropagation()
            clearOptions()
          }}
          className="text-slate-300 border-none outline-none cursor-pointer p-0 text-xl hover:text-slate-600">
          &times;
        </button>
        <div className="bg-slate-300 self-stretch w-0.5"></div>
        <div className="flex border-4 border-solid border-transparent border-t-slate-300 translate-y-1"></div>
        <ul
          className={[
            'absolute',
            ' m-0',
            'p-0',
            'list-none',
            'max-h-60',
            'overflow-y-auto',
            ' border-2',
            'border-solid',
            'border-slate-200 ',
            'rounded w-full',
            'left-0',
            'top-[calc(100%+.25em)]',
            'z-100',
            isOpen ? 'block' : 'hidden',
          ].join(' ')}>
          {options.map((option, index) => (
            <li
              onClick={(event) => {
                event.stopPropagation()
                selectOption(option)
                setIsOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={[
                'px-1',
                'py-2 ',
                'cursor-pointer ',
                'hover:bg-sky-400',
                isOptionSelected(option) ? 'text-white bg-sky-600' : '',
                index == highlihtedIndex ? 'text-white bg-sky-400' : '',
              ].join(' ')}
              key={index}>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
