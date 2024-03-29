import {
   Bars3Icon,
   BellIcon,
   CalendarIcon,
   ChartPieIcon,
   Cog6ToothIcon,
   DocumentDuplicateIcon,
   FolderIcon,
   HomeIcon,
   UsersIcon,
   XMarkIcon,
} from '@heroicons/react/24/outline'
const primary = [
   {
      name: 'Reservas',
      href: '/dashboard/bookings/calendar',
      icon: HomeIcon,
      current: true,
   },
   { name: 'Bicicletas', href: '#', icon: UsersIcon, current: false },
   {
      name: 'Usuarios',
      href: '/dashboard/users/new',
      icon: FolderIcon,
      current: false,
   },
   { name: 'Calendario', href: '#', icon: CalendarIcon, current: false },
   {
      name: 'Administración',
      href: '#',
      icon: DocumentDuplicateIcon,
      current: false,
   },
   { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const secondary = [
   { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
   { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
   { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

export const sidebarContent = { primary, secondary }
