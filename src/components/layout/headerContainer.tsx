import Link from 'next/link';
import { Cart } from '../ui/cart';
import { UserNav }  from '../ui/userNav';
import Logotype from '../../assets/Logo-md.svg';
import Image from 'next/image';

export function HeaderContainer() {
  return <div className="container mx-auto p-4 flex items-center md:justify-between lg:justify-between xl:justify-between justify-center ">
            <Link href={'/'} className="flex items-center justify-center gap-2 text-xl">
              <Image src={Logotype} alt="Logotipo" />
            </Link>
            <div className="flex items-center justify-center space-x-3">
              <Cart/>
              <UserNav />
            </div>
        </div>
}
  