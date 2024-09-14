import { Logo } from '../components/logo';
import { ModeToggle } from "../components/mode-toggle"



export const Menu = () => {
    return (
        <section className="bg-slate-100 dark:bg-slate-900 pt-5">
            <div className="container mx-auto p-4 lg:w-5/6 flex justify-between items-center flex-wrap">
                <Logo />
                <ModeToggle />
            </div>
        </section>
    )
}
