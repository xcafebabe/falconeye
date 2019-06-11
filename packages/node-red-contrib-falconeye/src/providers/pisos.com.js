import FlatProvider from './flatProvider'

export default class extends FlatProvider {
  constructor() {
    super({
      id: 'pisos',
      name: 'pisos.com',
      logo: 'http://www.pisosinmobiliarios.com/wp-content/uploads/2012/07/pisos.com_.jpg',
      scope: '#parrilla .row',
      selectors: {
        id: '@id',
        title: '.infoPrice .titlePrice .title .anuncioLink',
        url: '.infoPrice .titlePrice .title .anuncioLink@href',
        price: '.infoPrice .priceBox .price .h1',
        rooms: '.infoPrice .charActions .characteristics .item:nth-of-type(2)',
        size: '.infoPrice .charActions .characteristics .item:nth-of-type(1)',
        description: '.infoPrice .descriptionAds .description',
        floor: '.infoPrice .charActions .characteristics .item:nth-of-type(4)',
        image: '.photo .overInfo img.noLazy@src',
        imageLazy: '.photo .overInfo img@data-lazy-img'
      },
      pagination: '.adlist-paginator-pages .adlist-paginator-pageselected:nth-of-type(2)'
    })
  }

  refine(item) {
    item.id = this.hash(item.id + '-pisos')
    item.image = item.image || item.imageLazy ||  'https://placeholdit.imgix.net/~text?txtsize=33&txt=Pisos&w=160&h=160'
    item.price = this.clean(item.price)
    item.size = this.clean(item.size)
    item.rooms = this.clean(item.rooms)
    item.floor = this.clean(item.floor)
    item.description = this.clean(item.description)
  }
}
