import { atom } from "recoil";

export const isDarkAtom = atom({
    key:"isDark",
    default:true,
})

export const pageAtom = atom({
    key:"page",
    default:1,
})