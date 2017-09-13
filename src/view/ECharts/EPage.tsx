import * as React from "react";
var echarts = require('echarts');
import { Slider } from 'antd';




interface PropsTypes {
    fundData: {
        value: Array;
        valueDataByMonth : Array;
    },
}

interface StateTypes {
    currentMounth: number,
    stockPercent: number,
    totalMoney: number,
    userMoney: Array,
}

class EPage extends React.Component<PropsTypes, StateTypes> {
    divElement: any;
    divElementUser: any;
    constructor(props: PropsTypes) {
        super(props);
        this.renderEChart = this.renderEChart.bind(this)
        this.sureClick = this.sureClick.bind(this)
        this.percentOnChange = this.percentOnChange.bind(this)
        this.state = {
            currentMounth: 0,
            stockPercent: 50,
            totalMoney: 100000,
            userMoney: [100000],
        };
    }
    render() {
        let style = {
            width: '600px',
            height: '400px',
        }

        let slider = {
            width: '300px'
        }
        return (
           <div>
               <div>当前资产{this.getCurrency()}</div>
               <div ref = {(ref)=>{this.divElement = ref}} style = {style}></div>
               <div ref = {(ref)=>{this.divElementUser = ref}} style = {style}></div>
               <div onClick = {this.sureClick}>就投资这么多</div>
               <div>
                   <Slider style = {slider} tipFormatter={this.formatter} onChange={this.percentOnChange} value={this.state.stockPercent}/>
                    <div>{this.state.stockPercent}%</div>
               </div>
               </div>
        );
    }

    getCurrency() {
        let money = this.state.totalMoney/10000;
        money = money.toFixed(1);
        let s = money + '万元'
        return s
    }

    percentOnChange(value) {
        console.log(value)
        this.state.stockPercent = value;
        this.setState({
            stockPercent: this.state.stockPercent,
        })
    }

    sureClick() {
        this.state.currentMounth = this.state.currentMounth + 1;
        this.setState({
            currentMounth: this.state.currentMounth
        });
        this.calcFundResult();
        this.renderEChart();
    }

    calcFundResult() {
        let postMoney = this.state.totalMoney * this.state.stockPercent * 0.01;
        let changeK = this.getFundChange();
        let totalMoney = this.state.totalMoney + postMoney * changeK;
        totalMoney = parseFloat(totalMoney.toFixed(1));
        let a = this.state.userMoney;
        a.push(totalMoney);
        this.setState({
            totalMoney: totalMoney,
            userMoney: a,
        })

        console.log('calcFundResult')

    }

    getFundChange() {
        let now = this.props.fundData.valueDataByMonth[this.state.currentMounth - 1];
        let next = this.props.fundData.valueDataByMonth[this.state.currentMounth];
        let k = (next - now) / now;
        return k
    }

    formatter(value) {
        return `${value}%`;
    }

    componentDidMount() {
        this.renderEChart()
    }

    renderEChart() {
        this.renderFundChart();
        this.renderUserChart();
    }

    renderUserChart() {
        console.log('123');
        var data = this.state.userMoney;
        var month = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        var myChart = echarts.init(this.divElementUser);
        var test = document.getElementById('test');
        var array = [];
        var monthArray = [];
        array = data.slice(0,this.state.currentMounth + 1);
        monthArray = month.slice(0,this.state.currentMounth + 1);
        myChart.setOption({
            title: { text: '总资产' },
            tooltipnpm
                : {},
            xAxis: {
                data: monthArray,
            },
            yAxis: {},
            series: [{
                name: '总资产',
                type: 'line',
                data: array,
            }]
        });
    }


    renderFundChart() {
        console.log('123');
        var data = [18.3, 22.3,18.7,19.4,22,22,30,25,25,27,31,32,33,41,39,38];
        var month = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        var myChart = echarts.init(this.divElement);
        var test = document.getElementById('test');
        var array = [];
        var monthArray = [];
        array = data.slice(0,this.state.currentMounth + 1);
        monthArray = month.slice(0,this.state.currentMounth + 1);
        myChart.setOption({
            title: { text: '长投电器[0000656]' },
            tooltipnpm
                : {},
            xAxis: {
                data: monthArray,
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: array,
            }]
        });
    }
}

EPage.defaultProps = {
    fundData: {
        value: [0.5,0.4,-0.3],
        valueDataByMonth :[18.3, 22.3,18.7,19.4,22,22,30,25,25,27,31,32,33,41,39,38],
    },
}

export default EPage;



//

// console.log('start');
//
// // 基于准备好的dom，初始化echarts实例

