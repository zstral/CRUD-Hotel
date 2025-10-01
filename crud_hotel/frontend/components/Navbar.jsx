import Link from 'next/link'
import { Saira_Extra_Condensed } from 'next/font/google';

const sairaExtraCondensed = Saira_Extra_Condensed({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Navbar() {
    return (
        <div className="flex flex-col fixed place-self-center inset-x-0 top-5 w-4xl gap-2">
            <div className="place-self-center text-white mb-2">
                <h1 className={`${sairaExtraCondensed.className} text-3xl font-semibold text-[#ffffffde]`}>
                    Hotel Pacific Reef
                </h1>
            </div>
            <div className="flex justify-between gap-10 items-center">
                <nav className="p-[5px] w-4xl bg-[#b6b6b64d] border border-[#86868621] backdrop-blur-sm rounded-full">
                    <ul className="flex justify-between font-extralight text-sm text-white">
                        <Link href="/">
                            <li className="navbar-button">Inicio</li>
                        </Link>
                        <Link href="/projects">
                            <li className="navbar-button">Reservar</li>
                        </Link>
                        <Link href="/about">
                            <li className="navbar-button">Contacto</li>
                        </Link>
                        <Link href="/about">
                            <li className="navbar-button">Centro de ayuda</li>
                        </Link>
                    </ul>
                </nav>
                <div className="h-9 w-10 rounded-full bg-[#ffffff83]" />
            </div>
        </div>
    )
}