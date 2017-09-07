import React from "react";

export default (loadComponentSrc: any) => {
    let loadComponent = require("bundle-loader?lazy!" + loadComponentSrc);
    return {
        component: (props: any) => (
            <Bundle load={loadComponent}>
                 {(Component: any) => <Component {...props}/>}
            </Bundle>
        ),
        loadBundle: loadComponent
    };
};


class Bundle extends React.Component<any, {mod: any}> {
    constructor() {
        super();
        this.state = {
            // short for "module" but that's a keyword in js, so "mod"
            mod: null
        };
        this.load = this.load.bind(this);
    }
    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.loadComponent !== this.props.loadComponent) {
            this.load(nextProps);
        }
    }

    load(props: any) {
        this.setState({
            mod: null
        });
        props.loadComponent((mod: any) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            });
        });
    }
    render() {
        return <this.state.mod />;
    }
}