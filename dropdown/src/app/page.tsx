'use client'

import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Dropdown, SelectOption } from './components/Dropdown/Dropdown'

const inter = Inter({ subsets: ['latin'] })

const options = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'First', value: 5 },
  { label: 'Second', value: 6 },
  { label: 'Third', value: 7 },
  { label: 'Fourth', value: 8 },
]

export default function Home() {
  const [valueOption, setValueOption] = useState<SelectOption | undefined>(options[0])
  const [valueOptions, setValueOptions] = useState<SelectOption[]>([options[0]])
  return (
    <main className="flex flex-row space-x-96 justify-items-center items-center">
      <div className="m-6">
        <Dropdown options={options} value={valueOption} onChange={(item) => setValueOption(item)} />
      </div>

      <div className="m-6">
        <Dropdown multiple options={options} value={valueOptions} onChange={(items) => setValueOptions(items)} />
      </div>
    </main>
  )
}
