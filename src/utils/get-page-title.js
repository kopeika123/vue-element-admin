import defaultSettings from '@/settings'

const title = defaultSettings.title || 'EVE Кабинет'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
