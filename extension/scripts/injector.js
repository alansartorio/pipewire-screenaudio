const nullthrows = (v) => {
  if (v == null) throw new Error('null')
  return v
}

async function injectCode (src) {
  const scriptSetVariable = document.createElement('script')
  //const {type} = await chrome.runtime.sendMessage({message: 'get-session-type'});
  //scriptSetVariable.id = "AAAAAAA"
  //scriptSetVariable.text = `window.sessionType = "${type}"`
  //scriptSetVariable.onload = function () {
    //console.debug("AAAAAA loaded")
  //}
  //window.addEventListener(
    //"message",
    //(event) => {
      //console.debug(event);
    //}
  //)
  //window.sessionType = type
  const {type} = await browser.runtime.sendMessage({message: 'get-session-type'});
  //const type = response.type
  //console.debug(window.sessionType)

  const script = document.createElement('script')
  script.src = src
  script.onload = async function () {
    console.debug('pipewire-screenaudio script injected')

    window.postMessage({message: "set-session-type", type})

    this.remove()
  }

  nullthrows(document.head || document.documentElement).appendChild(scriptSetVariable)
  nullthrows(document.head || document.documentElement).appendChild(script)
}

injectCode(chrome.runtime.getURL('/scripts/index.js'))
