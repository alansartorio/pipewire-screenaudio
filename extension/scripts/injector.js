const MESSAGE_NAME = 'com.icedborn.pipewirescreenaudioconnector'

const nullthrows = (v) => {
  if (v == null) throw new Error('null')
  return v
}

async function injectCode (src) {
  //const scriptSetVariable = document.createElement('script')
  //scriptSetVariable.innerHtml = `window.sessionType = "${type}"`
  const {type} = await chrome.runtime.sendNativeMessage(MESSAGE_NAME, { cmd: 'GetSessionType', args: [] })

  const script = document.createElement('script')
  script.src = src
  script.onload = async function () {
    console.debug('pipewire-screenaudio script injected')

    console.debug(type)
    this.remove()
  }

  const doc = nullthrows(document.head || document.documentElement)
  //doc.appendChild(scriptSetVariable)
  doc.appendChild(script)
}

injectCode(chrome.runtime.getURL('/scripts/index.js'))
