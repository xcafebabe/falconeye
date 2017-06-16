import Xray from 'x-ray'
import Idealista from './providers/idealista.com.js'
import FotoCasa from './providers/fotocasa.es.js'

const providers = {
  ideal: new Idealista(),
  foto: new FotoCasa()
}

export default (RED) => {
  class FalconEyeNode {
    constructor(n) {
      RED.nodes.createNode(this, n)

      this.name = n.name
      this.url = n.url
      this.provider = providers[n.provider]
      this._scrap = Xray()
        .delay(n.delay)
        .timeout(n.timeout)

      this.keywords = n.keywords
      this.topic = n.topic

      this.updateStatus('ready')

      //Usually input should be an inject node with a timestamp
      this.on('input', msg => {
        this.updateStatus('started', 'green')

        this._scrap(this.url, this.provider.scope, [this.provider.selectors])
          .paginate(this.provider.pagination)((err, items) => {
            if (err) {
              this.updateStatus('error', 'red')
              this.error('Error ocurred during scrapping ' + err.toString())
              return false
            }

            //Disguise averagues and extra format!
            this.provider.disguise(items)
            //Filter Items
            let filteredItems = this.keywords ? this.provider.filter(items, { excludeByKeywords: this.keywords}) : items
            this.send({
              payload: filteredItems,
              topic: this.topic,
              provider: n.provider
            })
            this.updateStatus('success', 'green')
          })
      })

    }

    updateStatus(text, color) {
      let selectedColor = color || 'grey'
      this.status({ fill: selectedColor, shape: 'ring', text: text })
    }
  }
  RED.nodes.registerType('falconeye', FalconEyeNode)
}