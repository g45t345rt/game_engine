const data = {}
const audioContext = new AudioContext()

export function load ({ name, path, keys }) {
  return new Promise((resolve) => {
    fetch(path).then((res) => {
      res.arrayBuffer().then((audioData) => {
        audioContext.decodeAudioData(audioData).then((buffer) => {
          data[name] = { buffer, keys }
          resolve()
        })
      })
    })
  })
}

export function loadAll (manifest) {
  return Promise.all(manifest.map((d) => load(d)))
}

export function play (buffer, { start, duration, loop = false, onEnded } = {}) {
  const source = audioContext.createBufferSource()
  source.addEventListener('ended', onEnded)
  source.buffer = buffer
  source.connect(audioContext.destination)

  if (loop) {
    source.loop = true
    if (start) source.loopStart = start
    if (duration) source.loopEnd = duration
  } else {
    if (start && duration) source.start(0, start, duration)
    else if (start) source.start(0, start)
    else if (duration) source.start(0, 0, duration)
    else source.start()
  }
}

export function playFromKey (name, key, options) {
  const dataAudio = data[name]
  if (dataAudio) {
    const dataKey = dataAudio.keys[key]
    play(dataAudio.buffer, { ...dataKey, ...options })
  }
}

export default { play, loadAll, playFromKey, load }