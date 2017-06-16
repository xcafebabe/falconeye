const EMPTY_VALUE = ''
const KEYWORD_SEPARATOR = ','

export default class {

  constructor(options) {
    const defaultOptions = {
      id: EMPTY_VALUE,
      name: EMPTY_VALUE,
      logo: EMPTY_VALUE,
      scope: EMPTY_VALUE,
      pagination: EMPTY_VALUE,
      selectors: {
        id: EMPTY_VALUE,
        title: EMPTY_VALUE,
        url: EMPTY_VALUE,
        price: EMPTY_VALUE,
        rooms: EMPTY_VALUE,
        size: EMPTY_VALUE,
        description: EMPTY_VALUE,
        contact: EMPTY_VALUE,
        image: EMPTY_VALUE
      }
    }

    const myOptions = Object.assign({}, defaultOptions, options)
    this.id = myOptions.id
    this.name = myOptions.name
    this.scope = myOptions.scope
    this.pagination = myOptions.pagination
    this.selectors = myOptions.selectors
  }

   /**
   * Beautify / normalize item list. Is called inmediatelly
   * after website has been scrapped.
   * This is a default and optimistic disguise implementation.
   * You can overwrite it anytime in your provider implementation
   * but also you can implement method refine
   *
   * @params {array} items - Scrapped list of items
   */
  disguise(items = []) {
    if (items.length > 0) {
      items.averages = {
        price: 0,
        meterPrice: 0
      }
      let price, size = 0
      for (let item of items) {
        price = parseFloat(item.price) || 1
        size = parseFloat(item.size) || 1
        item.meterPrice = parseFloat(price/size)
        item.created = new Date()
        item.id = item.id || this.hash(item.title + item.agency)
        item.title = item.title || 'No Title'
        item.description = item.description || 'No Description'

        this.refine(item)

        items.averages.price += price
        items.averages.meterPrice += parseFloat(item.average)
      }

      items.averages.price = items.averages.price / items.length
      items.averages.meterPrice = items.averages.meterPrice / items.length
    }
  }

  /**
   * Your provider implementation could implement this function in order
   * to beautify / normalize properties like date or description
   */
  refine(item) {
    return item
  }

  /**
   * Helps to filter items list using keywords exclusion
   *
   * Another filters could be implemented, just follow same implementation
   */
  filter(items, filters) {
    let filteredItems = []

    const keywords = filters.excludeByKeywords ? filters.excludeByKeywords.split(KEYWORD_SEPARATOR).map((word) => word.trim()) : false,
      //meterPrice = filters.excludeByMeterPrice || false,
      filterFunctions = [
        keywords ? this.isIncludedByNotAllowedKeywords(keywords) : this.isIncluded
        //meterPrice ? this.isIncludedByMeterPrice(meterPrice) : this.isIncluded
      ]

    //iteracion y en los filtros buscar lo que quieres
    for (let item of items) {
      let allowToInclude = 0
      for (let isIncludedItemFilter of filterFunctions) {
        if (isIncludedItemFilter(item)) {
          allowToInclude++
        } else { //Stop everything when any of filters return false
          break
        }
        //If everything went well
        if (allowToInclude === filterFunctions.length) {
          filteredItems.push(item)
        }
      }
    }

    //Could happen duplication of element during pagination
    // const currentIds = [],
    //   withoutDuplicationsItems = []
    // for (let filteredItem of filteredItems) {
    //   if (currentIds.indexOf(filteredItem.id) === -1) {
    //     withoutDuplicationsItems.push(filteredItem)
    //     currentIds.push(filteredItem.id)
    //   }
    // }

    //return withoutDuplicationsItems

    return filteredItems

  }

  isIncludedByNotAllowedKeywords(keywords = []) {
    return (item = {}) => {
      for (let keyword of keywords) {
        if (!item.title || item.title.toLowerCase().indexOf(keyword) > -1) {
          return false
        }
      }

      return true
    }
  }

  isIncluded() {
    return true
  }

  hash (str) {
    let hash = 0, i, chr
    if (str.length === 0) return hash

    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i)
      hash  = ((hash << 5) - hash) + chr
      hash |= 0 // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  clean(text = '') {
    return text && text.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, ' ').trim()
  }

  extractNumbers(value = '') {
    return value.match(/\d+/g)
  }
}