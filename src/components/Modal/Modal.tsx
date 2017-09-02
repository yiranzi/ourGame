import React from "react";
import { Modal as AntdModal, Button, WhiteSpace, WingBlank } from "antd-mobile";


interface PropsTypes {
    show?: boolean;
    title?: string;
    bodyText?: string|JSX.Element;
    cancelText?: string;
    cancelFunction?: Function;
    sureText?: string;
    sureFunction?: Function;
}

function showModal({show, cancelFunction, sureFunction, cancelText, sureText, title, bodyText}: PropsTypes) {
    AntdModal.alert(title || "WARMING", bodyText || "加群通告", [
        {
            text: cancelText || "已经加过",
            onPress: () => cancelFunction && cancelFunction()
        }, {
            text: sureText || "立即加群",
            onPress: () => sureFunction && sureFunction()
        }
    ]);
}

let Modal: {
    showModal: Function
} = {};

Object.defineProperty(Modal, "showModal", {
    value: showModal,
    writable: false
});

export default Modal;