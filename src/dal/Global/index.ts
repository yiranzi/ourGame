import DALUserInfo from "./UserInfo";

const DALUserInfo_Instance = Symbol.for("DALUserInfoState");

if (!window.DALUserInfo_Instance) {
    window.DALUserInfo_Instance = new DALUserInfo();
}

export default window.DALUserInfo_Instance;