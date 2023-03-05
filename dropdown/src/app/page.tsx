import { Inter } from 'next/font/google'
import { Dropdown } from './components/Dropdown/Dropdown'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Dropdown
        onChange={function (value: { value: string; label: string } | undefined): void {
          throw new Error('Function not implemented.')
        }}
      />
    </main>
  )
}
