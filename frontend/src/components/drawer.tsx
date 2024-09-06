import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import content from '@/content/home.content.json'

export function DrawerSaibaMais() {
  return (
    <Drawer >
      <DrawerTrigger asChild>
        <Button variant="link" className="text-zinc-50 underline font-light animate-bounce">Saiba mais</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-zinc-950 border-zinc-800">
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle className="text-zinc-100">{content.drawerSaibaMais.title}</DrawerTitle>
            <DrawerDescription>{content.drawerSaibaMais.description}</DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-4 pb-8">
            {content.drawerSaibaMais.infos.map((info) => (
              <div className="p-4" key={info.id} >
                <div className="flex items-start gap-4 flex-col">
                  <DrawerTitle className="text-zinc-100 text-2xl leading-tight">
                    {info.title}
                  </DrawerTitle>
                  <DrawerDescription className="text-zinc-400 w-11/12">
                    {info.description}
                  </DrawerDescription>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </DrawerContent>
    </Drawer>
  )
}
