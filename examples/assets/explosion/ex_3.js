import Image from '../image'

export default new Image({
  id: 'ex_3',
  width: 74,
  height: 74,
  createImage: (ctx) => {
    const p1 = new Path2D('M26.05,4.55a15.17,15.17,0,0,0-2.2,2.75c-.5,0-1,0-1.55,0a14.51,14.51,0,0,0-10.65,4.4A14.51,14.51,0,0,0,7.25,22.3c0,.53,0,1.05,0,1.55a15.17,15.17,0,0,0-2.75,2.2A15,15,0,0,0,0,37.05a15,15,0,0,0,4.55,11,15.17,15.17,0,0,0,2.75,2.2c0,.5,0,1,0,1.55a14.51,14.51,0,0,0,4.4,10.65A14.4,14.4,0,0,0,22.3,66.9a11.21,11.21,0,0,0,1.55-.1,19,19,0,0,0,2.2,2.75,15,15,0,0,0,11,4.55,15,15,0,0,0,11-4.55,15.17,15.17,0,0,0,2.2-2.75,11.21,11.21,0,0,0,1.55.1A15.19,15.19,0,0,0,66.9,51.8a11.21,11.21,0,0,0-.1-1.55,15.17,15.17,0,0,0,2.75-2.2,15,15,0,0,0,4.55-11,15,15,0,0,0-4.55-11,15.17,15.17,0,0,0-2.75-2.2,11.21,11.21,0,0,0,.1-1.55,14.4,14.4,0,0,0-4.45-10.65A14.51,14.51,0,0,0,51.8,7.25c-.5,0-1,0-1.5,0a16.94,16.94,0,0,0-2.25-2.75A15,15,0,0,0,37.05,0a15,15,0,0,0-11,4.55M23.75,9.3a1.8,1.8,0,0,0,1-.2,2.51,2.51,0,0,0,.8-.75A12.55,12.55,0,0,1,27.5,6a12.92,12.92,0,0,1,9.55-4,13.09,13.09,0,0,1,9.6,4,13.42,13.42,0,0,1,2,2.4,1.76,1.76,0,0,0,.75.7,1.91,1.91,0,0,0,1.05.2c.43,0,.88-.05,1.35-.05a12.61,12.61,0,0,1,9.25,3.85,12.43,12.43,0,0,1,3.85,9.2c0,.43,0,.87-.05,1.3A1.77,1.77,0,0,0,65,24.7a1.89,1.89,0,0,0,.75.85,14.26,14.26,0,0,1,2.4,1.95,13,13,0,0,1,3.95,9.55,13.2,13.2,0,0,1-3.95,9.6,16.13,16.13,0,0,1-2.4,1.9,2,2,0,0,0-.9,2c0,.4.05.82.05,1.25A13.14,13.14,0,0,1,51.8,64.9c-.43,0-.85,0-1.25-.05a2,2,0,0,0-2,.9,16.13,16.13,0,0,1-1.9,2.4,13.2,13.2,0,0,1-9.6,3.95,13,13,0,0,1-9.55-3.95v0a19.83,19.83,0,0,1-1.95-2.5,1.89,1.89,0,0,0-.85-.7,1.77,1.77,0,0,0-1.1-.15c-.43,0-.87.05-1.3.05a12.43,12.43,0,0,1-9.2-3.85A12.61,12.61,0,0,1,9.25,51.8c0-.5,0-1,.05-1.4a1.91,1.91,0,0,0-.2-1,2.51,2.51,0,0,0-.75-.8A14,14,0,0,1,6,46.65a13.09,13.09,0,0,1-4-9.6A12.92,12.92,0,0,1,6,27.5a12.55,12.55,0,0,1,2.35-1.95,2.51,2.51,0,0,0,.75-.8,1.8,1.8,0,0,0,.2-1c0-.47-.05-.95-.05-1.45a12.43,12.43,0,0,1,3.85-9.2,12.43,12.43,0,0,1,9.2-3.85C22.8,9.25,23.28,9.27,23.75,9.3Z')
    ctx.fillStyle = '#ff5f4f'
    ctx.fill(p1)

    const p2 = new Path2D('M24.75,9.1a1.8,1.8,0,0,1-1,.2c-.47,0-.95-.05-1.45-.05a12.43,12.43,0,0,0-9.2,3.85,12.43,12.43,0,0,0-3.85,9.2c0,.5,0,1,.05,1.45a1.8,1.8,0,0,1-.2,1,2.51,2.51,0,0,1-.75.8A12.55,12.55,0,0,0,6,27.5a12.92,12.92,0,0,0-4,9.55,13.09,13.09,0,0,0,4,9.6,14,14,0,0,0,2.35,1.9,2.51,2.51,0,0,1,.75.8,1.91,1.91,0,0,1,.2,1c0,.43-.05.9-.05,1.4a12.61,12.61,0,0,0,3.85,9.25,12.43,12.43,0,0,0,9.2,3.85c.43,0,.87,0,1.3-.05a1.77,1.77,0,0,1,1.1.15,1.89,1.89,0,0,1,.85.7,19.83,19.83,0,0,0,1.95,2.5v0a13,13,0,0,0,9.55,3.95,13.2,13.2,0,0,0,9.6-3.95,16.13,16.13,0,0,0,1.9-2.4,2,2,0,0,1,2-.9c.4,0,.82.05,1.25.05A13.14,13.14,0,0,0,64.9,51.8c0-.43,0-.85-.05-1.25a2,2,0,0,1,.9-2,16.13,16.13,0,0,0,2.4-1.9,13.2,13.2,0,0,0,3.95-9.6,13,13,0,0,0-3.95-9.55,14.26,14.26,0,0,0-2.4-1.95A1.89,1.89,0,0,1,65,24.7a1.77,1.77,0,0,1-.15-1.1c0-.43.05-.87.05-1.3a12.43,12.43,0,0,0-3.85-9.2A12.61,12.61,0,0,0,51.8,9.25c-.47,0-.92,0-1.35.05a1.91,1.91,0,0,1-1.05-.2,1.76,1.76,0,0,1-.75-.7,13.42,13.42,0,0,0-2-2.4,13.09,13.09,0,0,0-9.6-4A12.92,12.92,0,0,0,27.5,6a12.55,12.55,0,0,0-1.95,2.35A2.51,2.51,0,0,1,24.75,9.1Z')
    ctx.fillStyle = '#f75140'
    ctx.fill(p2)

    const p3 = new Path2D('M60.4,37.05q0-6.79-6.85-11.6a21.55,21.55,0,0,0-3-1.85,30.9,30.9,0,0,0-1.85-3.05q-4.8-6.85-11.6-6.85t-11.6,6.85A21.55,21.55,0,0,0,23.6,23.6a23.92,23.92,0,0,0-3.1,1.85q-6.79,4.8-6.8,11.6t6.8,11.6a35.71,35.71,0,0,0,3.1,1.85,23.92,23.92,0,0,0,1.85,3.1q4.8,6.8,11.6,6.8t11.6-6.8a23.92,23.92,0,0,0,1.85-3.1,21.55,21.55,0,0,0,3-1.85Q60.41,43.85,60.4,37.05Z')
    ctx.fillStyle = '#f90'
    ctx.fill(p3)

    const p4 = new Path2D('M34.4,12.55a233,233,0,0,0-1.1,24.5,233,233,0,0,0,1.1,24.5Q35.5,71.7,37.05,71.7T39.7,61.55a233,233,0,0,0,1.1-24.5,233,233,0,0,0-1.1-24.5Q38.6,2.39,37.05,2.4T34.4,12.55Z')
    ctx.fillStyle = '#f90'
    ctx.fill(p4)

    const p5 = new Path2D('M71.7,37.05q0-1.54-10.15-2.65a233,233,0,0,0-24.5-1.1,233,233,0,0,0-24.5,1.1Q2.39,35.5,2.4,37.05T12.55,39.7a233,233,0,0,0,24.5,1.1,233,233,0,0,0,24.5-1.1Q71.7,38.6,71.7,37.05Z')
    ctx.fillStyle = '#f90'
    ctx.fill(p5)

    const p6 = new Path2D('M50.4,37.1A13.32,13.32,0,0,0,37.1,23.75,13.32,13.32,0,0,0,23.75,37.1,13.32,13.32,0,0,0,37.1,50.4,13.32,13.32,0,0,0,50.4,37.1m-5.3-8a11.35,11.35,0,0,1,0,16,11.35,11.35,0,0,1-16,0,11.23,11.23,0,0,1,0-16,11.23,11.23,0,0,1,16,0Z')
    ctx.fillStyle = '#ffd323'
    ctx.fill(p6)

    const p7 = new Path2D('M48.4,37.1A11.35,11.35,0,0,0,37.1,25.75,11.44,11.44,0,0,0,25.75,37.1,11.35,11.35,0,0,0,37.1,48.4,11.27,11.27,0,0,0,48.4,37.1Z')
    ctx.fillStyle = '#fc0'
    ctx.fill(p7)
  }
})
