import DALUserInfo from "./UserInfo";

if (!(window as any).DALUserInfo_Instance) {
    (window as any).DALUserInfo_Instance = new DALUserInfo();
}

export default (window as any).DALUserInfo_Instance;