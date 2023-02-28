import React from 'react'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';

export const ChartPieBase = ({porcentaje}) => {
  return (
    <CircularProgressbar 
            value={porcentaje} 
            text={`${porcentaje}%`} 
            styles={{
              // Customize the root svg element
              root: {},
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: `#3297FC`,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Customize transition animation
                transition: 'stroke-dashoffset 0.5s ease 0s',
                // Rotate the path
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: 'rgba(209, 13, 13)',
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Rotate the trail
                transformOrigin: 'center center',
              },
              // Customize the text
              text: {
                // Text color
                fill: ' #000000 ',
                // Text size
                fontSize: '16px',
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: '#3e98c7',
              },
            }}
          />
  )
}
