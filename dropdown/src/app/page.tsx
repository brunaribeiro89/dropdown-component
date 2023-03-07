import { Inter } from 'next/font/google'
import { Dropdown } from './components/Dropdown/Dropdown'

const inter = Inter({ subsets: ['latin'] })

const options = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 1 },
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 1 },
]

export default function Home() {
  return (
    <main>
      <Dropdown
        options={options}
        onChange={function (value: { value: string | number; label: string } | undefined): void {
          throw new Error('Function not implemented.')
        }}
      />
    </main>
  )
}
