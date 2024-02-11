import {
    Home,
    AppWindow,
    Contact,
    MoveUpRight,
    ArrowRight,
} from "lucide-react";

/** @type {SidebarMenuItem[]} */
const sidebarMenu = [
    { title: "Blog Post", icon: Home, path: "/" },
    { title: "Users", icon: Contact, path: "/users/list" },
];

export default sidebarMenu;
