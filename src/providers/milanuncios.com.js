import FlatProvider from './flatProvider'

export default class extends FlatProvider {
  constructor() {
    super({
      id: 'mil',
      name: 'milanuncios.com',
      logo: 'https://static.milanuncios.com/imagenes/logo.png',
      scope: '#cuerpo .aditem',
      selectors: {
        id: '.aditem-image@id',
        image: '.aditem-image a img@src',
        title: '.aditem-detail a',
        url: '.aditem-detail a@href',
        price: '.adlist-tagsbox-inlineblockline .aditem-price',
        rooms: '.inmo-attributes .dor',
        size: '.inmo-attributes .m2',
        description: '.aditem-detail .tx'
      },
      pagination: '.adlist-paginator-pages .adlist-paginator-pageselected:nth-of-type(2)'
    })
  }

  refine(item) {
    item.id = this.hash(item.id + '-milanuncios')
  }
}
