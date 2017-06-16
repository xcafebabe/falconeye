import FlatProvider from './flatProvider'

export default class extends FlatProvider {
  constructor() {
    super({
      id: 'ideal',
      name: 'idealista.com',
      logo: 'https://st1.idealista.com/static/common/icons/152x152.png?20170615151429',
      scope: '.items-container article .item',
      selectors: {
        id: '@data-adid',
        title: '.item-link',
        url: '.item-link@href',
        price: '.item-price',
        rooms: '.item-detail:nth-of-type(1)',
        size: '.item-detail:nth-of-type(2)',
        description: '.item-description',
        contact: '.icon-phone',
        image: '.item-gallery img@data-ondemand-img',
        //Customs
        floor: '.item-detail:nth-of-type(3)'
      },
      pagination: '.pagination .next a@href'
    })
  }

  refine(item) {
    item.description = (item.description || 'No Description, ') + ' Extra: ' + item.floor
    item.id = this.hash(item.id + '-idealista')
  }
}