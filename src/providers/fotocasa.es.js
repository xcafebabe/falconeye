import FlatProvider from './flatProvider'


export default class extends FlatProvider {
  constructor() {
    super({
      id: 'foto',
      name: 'fotocasa.es',
      logo: 'http://login.inmofactory.com/Content/images/logo-fotocasa-portal.png',
      scope: '.re-Searchresult .re-Searchresult-itemRow',
      selectors: {
        id: '@data-reactid',
        title: '.sui-Card-secondary .re-Card-wrapperTitle .re-Card-meta a',
        url: '.sui-Card-secondary .re-Card-wrapperTitle .re-Card-meta a@href',
        price: '.sui-Card-secondary .re-Card-price span',
        rooms: '.sui-Card-secondary .re-Card-wrapperFeatures .re-Card-feature:nth-of-type(1)',
        size: '.sui-Card-secondary .re-Card-wrapperFeatures .re-Card-feature:nth-of-type(2)',
        contact: '.sui-Card-secondary .re-Card-contactButton .re-Card-contactButton--phone .re-Button re-Button--flat span',
        description: '.sui-Card-secondary .re-Card-description'
      },
      pagination: 'noop' //Paginacion tambien con onclick :S
    })
  }

  refine(item) {
    item.image = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Fotocasa&w=160&h=160'
    item.id = this.hash(item.id + '-fotocasa')
  }
}