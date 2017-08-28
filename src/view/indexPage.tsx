import * as React from "react";
import Carousel from "@/components/Carousel/Carousel";


interface StateTypes {
    Carouselindex: number;
}
export default class IndexPage extends React.Component<{}, StateTypes> {
    constructor() {
        super();
        this.handleIndexChangeCallback = this.handleIndexChangeCallback.bind(this);
        this.state = {
            Carouselindex: 0,
        };
    }
    handleIndexChangeCallback(index: number) {
        if (this.state.Carouselindex + index > -1 && this.state.Carouselindex + index < 7) {
            this.setState((prevState, props) => ({
                Carouselindex: prevState.Carouselindex + index
            }));
        }
    }
    render() {
        return (
            <Carousel
                index={this.state.Carouselindex}
                contentPaddingTop={"20%"}
                handleIndexChangeCallback={this.handleIndexChangeCallback} 
                direction={"horizontal"}
                animationDuration={.5}>
                <div data-index="1" style={{ height: "100%" }}>
                    <h1 >1</h1>
                </div>
                <div data-index="2" style={{ height: "100%" }}>
                    <h1 >2</h1>
                </div>
                <div data-index="3" style={{ height: "100%" }}>
                    <h1 >3</h1>
                </div>
                <div data-index="4" style={{ height: "100%" }}>
                    <h1>4</h1>
                </div>
                <div data-index="5" style={{ height: "100%" }}>
                    <h1>5</h1>
                </div>
                <div data-index="6" style={{ height: "100%" }}>
                    <h1 >6</h1>
                </div>
                <div data-index="7" style={{ height: "100%" }}>
                    <h1>7</h1>
                </div>
            </Carousel>
        );
    }
}