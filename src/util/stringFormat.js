import { capFirst } from './stringfns'

export const formatLocation = (city, state, zip) =>
    city && state
        ? `${city}, ${state}`
        : city && !state
        ? city
        : state && !city
        ? state
        : zip
        ? zip
        : 'Somewhere Sunny'

export const formatName = (first, last) =>
    first && last
        ? `${capFirst(first)} ${capFirst(last)}`
        : first && !last
        ? first
        : last && !first
        ? last
        : ''

export const formatTitle = title => title || 'Awesome Person'

export const formatSocialLink = (prefix, handle) =>
    handle ? `${prefix}${handle}` : null
