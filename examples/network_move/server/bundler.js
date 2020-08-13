const Bundler = require('parcel')
const path = require('path')
const { spawn } = require('child_process')

const options = {
  outDir: path.join(__dirname, './build'),
  watch: true,
  target: 'node',
  bundleNodeModules: true
}

let childProcess = null

const startNodeServer = () => {
  if (childProcess) {
    console.log('Killing node server')
    childProcess.kill()
    return
  }

  console.log('Node server started')
  childProcess = spawn('node', [path.join(__dirname, './build/index.js')])

  childProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  childProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  childProcess.on('close', (code, signal) => {
    console.log('Node server killed')
    childProcess = null
    if (signal === 'SIGTERM') {
      return startNodeServer()
    }
  })
}

const startBundler = async () => {
  const bundler = new Bundler([path.join(__dirname, './index.js')], options)
  bundler.on('buildEnd', () => startNodeServer())
  await bundler.bundle()
}

startBundler()
