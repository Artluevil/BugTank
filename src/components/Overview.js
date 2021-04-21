import React, { useState } from 'react';
import './style.css';
import {RadialChart, XYPlot, VerticalBarSeries, XAxis, YAxis, LineSeries, HorizontalGridLines} from 'react-vis';

const Overview = (props) => {

    const [noData, setNoData] = useState(false)

    const { dataBugs, id } = props

    //let dates = [{January: 0}, {February: 0}, {March: 0}, {April: 0}, {May: 0}, {June: 0}, {July: 0}, {August: 0}, {September: 0}, {October: 0}, {November: 0}, {December: 0}]
    let dates = [{January: 0}, {February: 0}, {March: 0}, {April: 0}, {May: 0}, {June: 0}, {July: 0}, {August: 0}, {September: 0}, {October: 0}, {November: 0}, {December: 0}]

    function getDates(date) {
        const dateNumFirst = date[3]
        const dateNumSecond = date[4]
        if ( dateNumFirst === '0') {
            return Number(dateNumSecond)
        } else {
            const dateCombined = dateNumFirst + dateNumSecond
            return Number(dateCombined)
        }
    }

    let data = [
        {angle: 0, color: 'green', label: '0'},
        {angle: 0, color: 'orange', label: '0'},
        {angle: 0, color: 'red', label: '0'}
      ];

    const dataLine = [
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
        {x: 4, y: 0},
        {x: 5, y: 0},
        {x: 6, y: 0},
        {x: 7, y: 0},
        {x: 8, y: 0},
        {x: 9, y: 0},
        {x: 10, y: 0},
        {x: 11, y: 0},
        {x: 12, y: 0}
      ];  

    function getDataToChart() {
        let Low = 0
        let Medium = 0
        let High = 0
        dataBugs.map(bug => {
            if (bug.id === id) {
                if (bug.priority === "Low") {
                    Low = Low + 1
                } else if (bug.priority === "Medium") {
                    Medium = Medium + 1
                } else if (bug.priority === "High") {
                    High = High + 1
                }
                dataLine.map(theDate => {
                    if (getDates(bug.date) === theDate.x) {
                        theDate.y = theDate.y + 1
                    }
                })
            }
        })

        data[0].angle = Low
        data[1].angle = Medium
        data[2].angle = High
        
        data[0].label = String(Low)
        data[1].label = String(Medium)
        data[2].label = String(High)

        if (data[0].angle == 0) {
            data[0].label = null
        }
        if (data[1].angle == 0) {
            data[1].label = null
        }
        if (data[2].angle == 0) {
            data[2].label = null
        }
    }

    getDataToChart()

    return (
        <div>
            <h1 style={{marginLeft: '3%', marginBottom: '0px'}}>Overview</h1>
            <div style={{marginLeft: '41%'}} className="App">
                <RadialChart 
                    width={400} 
                    height={400} 
                    innerRadius={110} 
                    radius={140} 
                    data={data} 
                    colorType="literal" 
                    padAngle={0.04} 
                    showLabels={true} 
                    labelsRadiusMultiplier={1.3}
                    onClick={() => console.log('yo')}
                />
                <p className="chart-priority">Priority</p>
            </div>
            <div className="priority-legend">
                <span>
                    <span className="block-legend green"></span>
                    <p>Low</p>
                </span>
                <span>
                    <span className="block-legend orange"></span>
                    <p>Medium</p>
                </span>
                <span>
                    <span className="block-legend red"></span>
                    <p>High</p>
                </span>
            </div>}
            <h2 style={{marginLeft: '3%'}}>Timeline</h2>
            <div style={{marginLeft: '32%'}}>
                <XYPlot height={400} width={700} xDomain={[1, 12]} yDomain={[0, 15]}>
                    <HorizontalGridLines />
                    <VerticalBarSeries data={dataLine} />
                    <XAxis title="Month" />
                    <YAxis />
                </XYPlot>
            </div>
        </div>
    )
}

export default Overview