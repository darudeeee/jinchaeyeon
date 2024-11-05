import { atom } from 'recoil';

//recoil state 생성
export const menuOpenState = atom({
	key: "menuOpenState",
	default: "게시판",
});

export const drawerOpenState = atom({
	key: "drawerOpenState",
	default: true,
});
