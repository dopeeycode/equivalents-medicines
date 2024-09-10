import { Link } from 'react-router-dom'
import { DrawerSaibaMais } from './components/drawer'
import { Button } from './components/ui/button'

import content from '@/content/home.content.json'

export function App() {
  return (
    <main className="antialiased bg-dots bg-center bg-no-repeat h-screen flex items-center justify-center bg-zinc-950">
       <div className="flex items-center py-4 px-4 sm:w-1/2 w-full flex-col gap-6">
        <h1 className="text-4xl bg-gradient-to-t from-zinc-400 to-zinc-100 bg-clip-text text-transparent text-[#FBFBFC] text-center font-bold">
          {content.mainTitle}
        </h1>
        <p className=" text-zinc-400 text-center w-full">
          {content.mainDescription}
          <DrawerSaibaMais />
        </p>
        <Link to={"/search"}>
          <Button  className="bg-zinc-900 hover:bg-zinc-800">
            {content.mainButtonCta}
          </Button>
        </Link>
       </div>
    </main>
  )
}