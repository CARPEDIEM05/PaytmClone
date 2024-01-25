import {atom,selector} from "recoil";


export const userFirstNameAtom = atom({
    key: "userAtom",
    default: ''
});

export const userLastNameAtom = atom({
    key: "userLastNameAtom",
    default: ''
})

export const userIdAtom = atom({
    key:"userId",
    default:''
})

export const usernameAtom = atom({
    key:"username",
    default:''
})

export const balanceAtom = atom({
    key:"balance",
    default:''
})

export const friendsNameAtom = atom({
    key: "friendsNameAtom",
    default: ''
})

export const friendsUsernameAtom = atom({
    key: "friendsUsernameAtom",
    default: ''
})
