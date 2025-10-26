import {
LuLayoutDashboard,
LuHandCoins,
LuWalletMinimal,
LuLogOut,
} from 'react-icons/lu';

export const SIDE_MENU_DATA = [
    {
        id: "01",
        name: "Dashboard",
        icon: LuLayoutDashboard,
        link: "/dashboard"
    },
    {
        id: "02",
        name: "Income",
        icon: LuWalletMinimal,
        link: "/income"
    },
    {
        id: "03",
        name: "Expense",
        icon: LuHandCoins,
        link: "/expense"
    },
    {
        id: "06",
        name: "Logout",
        icon: LuLogOut,
        link: "/logout"
    }
]