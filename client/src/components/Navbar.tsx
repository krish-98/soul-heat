import { Link } from 'react-router'
import {
  House,
  Store,
  Utensils,
  Headset,
  ShoppingBasket,
  Soup,
} from 'lucide-react'
import { motion } from 'motion/react'

interface NavLinksTypes {
  label: string
  href: string
  icon: React.ReactElement
}

const NavLinks: NavLinksTypes[] = [
  { label: 'Home', href: '/', icon: <House size={20} /> },
  { label: 'Restaurants', href: '/restaurants', icon: <Utensils size={20} /> },
  { label: 'About', href: '/about', icon: <Store size={20} /> },
  { label: 'Contact', href: '/contact', icon: <Headset size={20} /> },
]

const MotionLink = motion(Link)

export default function Navbar() {
  return (
    <nav className="hidden lg:flex justify-between items-center py-8">
      <div className="text-shOrange inline-flex items-center gap-1 font-semibold text-2xl tracking-tight">
        <h1>Soul Heat</h1>
        <span className="mb-1">
          <Soup size={30} />
        </span>
      </div>
      <div className="flex items-center gap-8">
        {NavLinks.map((navItem) => (
          <MotionLink
            key={navItem.label}
            to={navItem.href}
            whileHover={{ color: 'var(--color-shOrange)' }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-shAccent"
          >
            <span>{navItem.icon}</span>
            <span>{navItem.label}</span>
          </MotionLink>
        ))}
      </div>
      <div className="flex items-center gap-4 ">
        <MotionLink
          to="/cart"
          whileHover={{ color: 'var(--color-shOrange)' }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-shAccent"
        >
          <span>
            <ShoppingBasket size={20} />
          </span>
          <span>Cart</span>
        </MotionLink>
        <MotionLink
          to="/sign-in"
          whileHover={{ backgroundColor: 'var(--color-orange-600)' }}
          className="bg-shOrange text-white text-sm font-semibold py-2 px-6 rounded-lg"
        >
          Sign in
        </MotionLink>
      </div>
    </nav>
  )
}

const MobileNavbar = () => {
  return <nav className="lg:hidden"></nav>
}

/**
 * <House />
 * <Utensils />
 * <Store />
 * <PhoneCall /> <Headset />
 * <ShoppingCart />  <ShoppingBasket />
 * <User /> <CircleUser /> <CircleUserRound />
 *
 * <Bike />
 * <MapPinHouse />
 */

/**
 * <IconHome stroke={2} />
 * <IconBuildingStore stroke={2} />
 * <IconPhone stroke={2} />
 * <IconHeadset stroke={2} />
 * <IconShoppingBag stroke={2} /> <IconBasket stroke={2} /> <IconShoppingCart stroke={2} />
 * <IconPhone stroke={2} />
 * <IconUser stroke={2} />
 *
 * <IconRosetteDiscountCheckFilled stroke={2} /> Tick sucess
 * <IconPhone stroke={2} />
 * <IconPhone stroke={2} />
 * <IconPhone stroke={2} />
 *
 *
 */
