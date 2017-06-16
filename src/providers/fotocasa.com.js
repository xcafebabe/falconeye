import JobProvider from './jobProvider'


export default class extends JobProvider {
  constructor() {
    super({
      id: 'smash',
      name: 'smashingmagazine.com',
      logo: 'http://jobs.smashingmagazine.com/images/logo.png',
      scope: 'div.main ul.entry-list li',
      selectors: {
        title: 'article.entry h2',
        url: 'a@href',
        company: 'article.entry span.entry-company strong'
      }
    })
  }

  refine(item) {
    item.date = new Date()
  }
}