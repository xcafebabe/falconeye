import JobProvider from './jobProvider'
import Chrono from 'chrono-node'

export default class extends JobProvider {
  constructor() {
    super({
      id: 'rmtk',
      name: 'remoteok.io',
      logo: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Remote&w=160&h=160',
      scope: 'table#jobsboard tr.job',
      selectors: {
        title: 'td.company_and_position a.preventLink h2',
        url: 'td.company_and_position a.preventLink@href',
        date: 'td.time a',
        company: 'td.company_and_position a.companyLink'
      }
    })
  }

  _formatDate(dateTxt = '') {
    let search = dateTxt.charAt(dateTxt.length - 1)
    let replace = ''
    switch (search) {
      default:
      case 'd':
        replace = ' days ago '
        break
      case 'o':
        search = 'mo'
        replace = ' months ago '
        break
    }
    return dateTxt.replace(search, replace)
  }

  refine(item) {
    if (!(item.date instanceof Date)) {
      item.date = Chrono.parseDate(this._formatDate(item.date))
    }
  }
}
