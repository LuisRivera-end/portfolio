import {
  AudioLinesIcon,
  CarFrontIcon,
  CoffeeIcon,
  HospitalIcon,
  ShirtIcon,
  TicketIcon,
  type LucideIcon,
} from "lucide-react"

import type { ProjectIcon } from "@/types/portfolio"

export const projectIconMap: Record<ProjectIcon, LucideIcon> = {
  facsa: HospitalIcon,
  openfy: AudioLinesIcon,
  viczy: ShirtIcon,
  turnos: TicketIcon,
  estacionamiento: CarFrontIcon,
  bloomwish: CoffeeIcon,
}
