/**
 * ict主淫部门统一UI库
 * @module ICT-UI
 */

import * as React from "react";
import * as className from "./style/Carousel.less";


import SwipeView from "@/components/SwipeView/SwipeView";


interface PropsTypes {
    index: number;
    animationDuration?: number;
    contentPadding?: string;
    contentPaddingTop?: string;
    contentPaddingBottom?: string;
    contentPaddingLeft?: string;
    contentPaddingRight?: string;
    handleIndexChangeCallback?: Function;
    direction?: string;
    styleTop?: string;
    styleBottom?: string;
    styleLeft?: string;
    styleRight?: string;
    topNode?: JSX.Element;
    bottomNode?: JSX.Element;
    rightNode?: JSX.Element;
    leftNode?: JSX.Element;
}

/**
 * 滑动容器组件
 * @export
 * @class Carousel
 * @extends {React.PureComponent<PropsTypes>}
 * @type ICT-UI-Component
 * @author heartblood
 * @param {number} index - [必填] 当前显示index
 * @param {number} animationDuration - [可选] 动画持续时间
 * @param {function} handleIndexChangeCallback - [可选] index改变时候会触发该回调函数，必须含有一个参数index，index为 +- 1，表明当前index改变值
 * @param {string} direction - [可选] 表明方向，vertical为垂直，horizontal为水平，默认为垂直
 * @param {string} styleTop - [可选] 顶部slot样式
 * @param {string} styleBottom - [可选] 底部slot样式
 * @param {string} styleRight - [可选] 右部slot样式
 * @param {string} styleLeft - [可选] 左部slot样式
 * @param {JSX.Element} topNode - [可选] 顶部slot
 * @param {JSX.Element} bottomNode - [可选] 底部slot
 * @param {JSX.Element} rightNode - [可选] 右部slot
 * @param {JSX.Element} leftNode - [可选] 左部slot
 * @param {JSX.Element} children - [可选] 最外部标签需要含有data-index参数，标明该标签的index
 */
export default class Carousel extends React.PureComponent<PropsTypes> {
    name: "SliderView";
    private readonly touchDistance: number = 10;
    private readonly contentBody = this.getContentBody;
    private touchStartPoint: { screenX: number, screenY: number } = { screenX: 0, screenY: 0 };
    private touchStartPointTemp: { screenX: number, screenY: number } = { screenX: 0, screenY: 0 };
    private touchLock: Boolean = true;
    public static defaultProps: Partial<PropsTypes> = {
        direction: "vertical"
    };
    constructor(props: PropsTypes) {
        super(props);
        this.swiping = this.swiping.bind(this);
        this.swiped = this.swiped.bind(this);
    }
    /**
     * 获取显示列表元素
     * @func
     * @type get
     * @return Array<JSX.Element>
     */
    get getContentBody() {
        if (Array.isArray(this.props.children)) {
            let returnElement: Array<JSX.Element> = [];
            this.props.children.forEach((element: JSX.Element, index: number) => {
                if (element.props.hasOwnProperty("data-index")) {
                    returnElement.push(element);
                }
            });
            returnElement.sort((a: JSX.Element, b: JSX.Element) => {
                return a.props["data-index"] - b.props["data-index"];
            });
            return returnElement;
        } else {
            if ((this.props.children as JSX.Element).props.hasOwnProperty("data-index")) {
                return [this.props.children];
            }
        }
    }
    style(index: number) {
        return {
            transform: this.props.direction === "vertical" ? `translateY(-${100 * this.props.index}%)` : `translateX(-${100 * this.props.index}%)`,
            padding: this.props.contentPadding,
            paddingTop: this.props.contentPaddingTop,
            paddingBottom: this.props.contentPaddingBottom,
            paddingLeft: this.props.contentPaddingLeft,
            paddingRight: this.props.contentPaddingRight,
            visibility: index === this.props.index || index + 1 === this.props.index || index - 1 === this.props.index ? "visible" : "hidden",
            display: this.props.direction === "vertical" ? "block" : "inline-block",
            verticalAlign: "top",
            transition: `transform ${this.props.animationDuration}s`
        };
    }
    swiped() {
        this.touchLock = true;
    }
    swiping(e: any, deltaX: number, deltaY: number, absX: number, absY: number, velocity: number) {
        console.log(velocity);
        if (this.props.direction === "horizontal") {
            if (deltaX > 80 && velocity > 1 && this.touchLock) {
                this.touchLock = false;
                this.props.handleIndexChangeCallback && this.props.handleIndexChangeCallback(1);
            } else if (deltaX < -80 && velocity > 1 && this.touchLock) {
                this.touchLock = false;
                this.props.handleIndexChangeCallback && this.props.handleIndexChangeCallback(-1);
            }
        } else {
            if (deltaY > 150 && velocity > 1 && this.touchLock) {
                this.touchLock = false;
                this.props.handleIndexChangeCallback && this.props.handleIndexChangeCallback(1);
            } else if (deltaY < -100 && velocity > 1 && this.touchLock) {
                this.touchLock = false;
                this.props.handleIndexChangeCallback && this.props.handleIndexChangeCallback(-1);
            }
        }
    }
    render() {
        return (
            <SwipeView
                preventDefaultTouchmoveEvent={true}
                onSwiping={this.swiping} className={(className as any).container}
                onSwiped={this.swiped}>
                <div style={{ flexDirection: this.props.direction === "horizontal" ? "column" : "row" }}
                    className={(className as any).contentBody}>
                    {this.contentBody.map((element: JSX.Element, index: number) => {
                        return <div key={index} className={(className as any).contentPage} style={this.style(index)}>{element}</div>;
                    })}
                </div>
                <div className={(className as any).contentTop + " " + this.props.styleTop}>{this.props.topNode}</div>
                <div className={(className as any).contentBottom + " " + this.props.styleBottom}>{this.props.bottomNode}</div>
                <div className={(className as any).contentRight + " " + this.props.styleRight}>{this.props.rightNode}</div>
                <div className={(className as any).contentLeft + " " + this.props.styleLeft}>{this.props.leftNode}</div>
            </SwipeView>
        );
    }
}

