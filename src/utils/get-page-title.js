import defaultSettings from '@/settings'

const title = defaultSettings.title || 'vue stround'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
