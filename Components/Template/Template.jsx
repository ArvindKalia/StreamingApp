import { Navbar, IconButton } from "../../Tailwind";
const Template = ()=>{
    //const
    const menus= {
        brand: "Just for code",
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
                label: "CONTACT",
                href: "/contact"
            }
        ]
    }
    const toolbars=[
        {
            label: <IconButton 
            theme="error"
            size="sm"
            >search</IconButton>
        },
        {
            label: <IconButton 
            theme="error"
            size="sm"
            >person</IconButton>
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
        </>
    )
    return design;
}
export default Template;