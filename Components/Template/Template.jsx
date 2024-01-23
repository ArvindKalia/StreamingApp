import { Navbar, IconButton,Footer } from "../../Tailwind";
import Logo from "../Logo/Logo";
import { useSession } from "next-auth/react";
const Template = ({children})=>{

    const {data,status}= useSession();
    //const
    const menus= {
        brand: <Logo />,
        link: [
            {
                label: "HOME",
                href: "/"
            },
            {
                label: "MOVIES",
                href: "/movies"
            },
            {
                label: "VIDEOS",
                href: "/videos"
            },
            {
                label: "BLOG",
                href: "/blog"
            },
            {
                label: "PLANS",
                href: "/plans"
            },
            {
                label: "CONTACT",
                href: "/contact"
            }
        ]
    }
    const beforeLogin=[
        {
            label: "register",
            href: "/register",
            icon: "person"
        },
        {
            label: "login",
            href: "/login",
            icon: "login"
        }
    ];
    const afterLogin=[
        {
            label: data && data.user.name,
            href: data && data.user.role ==="ADMIN" ? "admin-panel/plans" : "/profile",
            icon: "person"
        },
        {
            label: "logout",
            href: "/api/auth/signout",
            icon: "login",
            logout: true
        }
    ]

    const toolbars=[
        {
            label: <IconButton 
            theme="primary"
            size="sm"
            >search</IconButton>
        },
        {
            label: <IconButton 
            dropdown
            dropdownMenu={
                status==="authenticated"
                ? afterLogin :
                beforeLogin
            }
            theme="error"
            size="sm"
            >
                {
                    status==="authenticated"
                    ? <img src={
                        data.user.image ? 
                        data.user.image : 'https://www.w3schools.com/howto/img_avatar.png'
                    } 
                    className="rounded-full"
                    alt="dummy" />
                    : "person"
                }
            </IconButton>
        }
    ]


    //markup
    const design=(
        <>
        <Navbar 
        menu={menus}
        theme="dark"
        toolbar={toolbars}
        variant="three"
        />
        <div>
            {children}
        </div>
        <Footer />
        </>
    )
    return design;
}
export default Template;