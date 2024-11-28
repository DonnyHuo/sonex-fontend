'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'

import { ArcElement, Chart, ChartData, Tooltip, TooltipItem } from 'chart.js'

Chart.register(ArcElement, Tooltip)

const DoughnutComponent = (props: {
  className: string
  data: ChartData<'doughnut'>
}) => {
  const { className, data } = props

  const options = {
    responsive: true,
    circumference: 360,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    cutout: '65%',
    plugins: {
      legend: {
        title: {
          display: false,
        },
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: function () {
            return ''
          },
          label: function () {
            return ''
          },
          footer: function (tooltipItems: TooltipItem<'doughnut'>[]) {
            if (tooltipItems.length > 0) {
              const label = tooltipItems[0].label
              const datasets = `$${tooltipItems[0].formattedValue}`
              return `${label}: ${datasets}`
            }
            return ''
          },
        },
      },
    },
  }
  return (
    <div className={className}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutComponent
