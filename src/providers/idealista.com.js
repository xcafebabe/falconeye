import JobProvider from './jobProvider'

export default class extends JobProvider {
  constructor() {
    super({
      id: 'newjob',
      name: 'newitjbos.com',
      logo: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=NewIt&w=160&h=160',
      scope: 'div.search-results article.listing-item',
      selectors: {
        title: 'div.listing-item__title a',
        url: 'div.listing-item__title a@href',
        date: 'div.listing-item__date',
        company: 'div.listing-item__desc',
        description: 'div.listing-item__desc'
      }
    })
  }

  refine(item) {
    const temp = this.clean(item.description)
    item.company = temp.substring(0, 15)
    item.description = temp.substring(16, temp.length - Math.floor(temp.length * 0.85)) // Only 15% of text content
  }
}