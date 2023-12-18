import Link from "next/link";
import { useEffect, useState } from "react";
import { Expand } from "..";
import { IconButton } from "..";
const sample = {
    fixed: "fixed top-0 left-0 w-full animate__animated animate__slideInDown",
    // fixedUp: "fixed top-0 left-0 w-full animate__animated animate__fadeInDown flex-col sm:flex-row",
    fixedWidth: "sm:w-4/5 mx-auto",
    dark : {
        nav : "bg-slate-900 sm:px-4",
        link : "text-white py-4 sm:py-6 px-8 sm:px-10 hover:bg-slate-800 hover:text-white"
    },
    light : {
        nav : "bg-gray-100 sm:px-4",
        link : "text-black py-4 sm:py-6 px-8 sm:px-10 hover:bg-gray-50"
    },
    primary: {
        nav: "bg-indigo-600 sm:px-4",
        link: "text-white py-4 sm:py-6 px-8 sm:px-10 hover:bg-indigo-500"
    },
    secondary: {
        nav: "bg-blue-600 sm:px-4",
        link: "text-white py-4 sm:py-6 px-8 sm:px-10 hover:bg-blue-500"
    },
    info: {
        nav: "bg-cyan-600 sm:px-4",
        link: "text-white py-4 sm:py-6 px-8 sm:px-10 hover:bg-cyan-500"
    },
    error: {
        nav: "bg-red-600 sm:px-4",
        link: "text-white py-4 sm:py-6 px-8 sm:px-10 hover:bg-red-500"
    },
    warning: {
        nav: "bg-orange-600 sm:px-4",
        link: "text-white py-4 sm:py-6 px-8 sm:px-10 hover:bg-orange-500"
    },
    success: {
        nav: "bg-green-600 sm:px-4",
        link: "text-white py-4 sm:py-6 px-8 sm:px-10 hover:bg-green-500"
    },
    variant: {
        one: "flex flex-col sm:flex-row sm:items-center sm:justify-start gap-12",
        two: "flex flex-col sm:flex-row sm:items-center sm:justify-end gap-12",
        three: "flex flex-col sm:flex-row sm:items-center sm:justify-between",
        four: "flex flex-col sm:flex-row sm:items-center sm:justify-around",
        five: "flex flex-col sm:flex-row sm:items-center sm:justify-evenly"
    }
}
const Navbar = ({
    fullWidth = true,
    theme = "primary",
    variant = "one",
    fixed = false,
    menu,
    sticky = null,
    toolbar = null
}) => {
    const [show, setShow] = useState(false);
    const [stickyControl, setStickyControl] = useState(sticky)
    useEffect(() => {
        if (sticky !== null) {
            window.onscroll = () => {
                if (window.scrollY > 300) {
                    return setStickyControl(true);
                }
                if (window.scrollY == 0) {
                    return setStickyControl(true);
                }
                else {
                    return setStickyControl(false);
                }
            }
        }
    }, [stickyControl])
    const Menus = ({ item }) => {
        const m = (
            <>
                <Link
                    className={sample[theme].link}
                    href={item.href}>{item.label}</Link>
            </>
        )
        return m;
    }
    const design = (
        <>
            <nav className={`
    ${sample[theme].nav} 
    ${fixed ? sample.fixed : null} 
    ${stickyControl ? sample.fixed : sample.fixedUp} 
    `}>
                <div className={`
        ${sample.variant[variant]}
        ${fullWidth ? null : sample.fixedWidth} 
        `}>
                    <div className="flex justify-between items-center mr-4">
                    <Link
                        className={sample[theme].link}
                        href="/">{menu.brand}
                    </Link>
                    <IconButton
                    className="sm:hidden" 
                    onClick={()=>setShow(!show)}>menu</IconButton>
                    </div>
                    <div className="hidden sm:flex flex-col sm:flex-row">
                        {
                            menu.link.map((item, index) => {
                                return <Menus key={index} item={item} />
                            })
                        }
                    </div>
                    {
                        toolbar ?
                            <div className="hidden sm:flex gap-3 p-4">
                                {toolbar.map((item, index) => {
                                    return <div key={index}>{item.label}</div>
                                })}
                            </div>
                            : null
                    }
                </div>
            </nav>
            <Expand 
            state={show}
            className="fixed bottom-0 left-0 w-full bg-slate-900 z-50"
            >
                <div className="sm:hidden flex flex-col sm:flex-row">
                    {
                        menu.link.map((item, index) => {
                            return <Menus key={index} item={item} />
                        })
                    }
                </div>
                {
                    toolbar ?
                        <div className="sm:hidden flex gap-3 p-4">
                            {toolbar.map((item, index) => {
                                return <div key={index}>{item.label}</div>
                            })}
                        </div>
                        : null
                }
            </Expand>

        </>
    );
    return design;
}
export default Navbar;