const nullthrows = (v) => {
  if (v == null) throw new Error('null')
  return v
}

async function injectCode (src) {
  const {type} = await browser.runtime.sendMessage({message: 'get-session-type'});

  const script = document.createElement('script')
  script.src = src
  script.onload = async function () {
    console.debug('pipewire-screenaudio script injected')

    window.postMessage({message: "set-session-type", type})

    this.remove()
  }

  nullthrows(document.head || document.documentElement).appendChild(script)
}

injectCode(chrome.runtime.getURL('/scripts/index.js'))
