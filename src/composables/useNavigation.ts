import { onBeforeUnmount, ref } from 'vue'
import type { Page } from '../types'

export function useNavigation() {
  const page = ref<Page>((window.history.state?.liisuPage as Page | undefined) ?? 'home')

  function navigate(nextPage: Page) {
    if (page.value === nextPage) return
    page.value = nextPage
    window.history.pushState({ liisuPage: nextPage }, '', window.location.href)
  }

  function handlePopState(event: PopStateEvent) {
    const previousPage = event.state?.liisuPage as Page | undefined
    if (previousPage) page.value = previousPage
  }

  window.history.replaceState({ liisuPage: page.value }, '', window.location.href)
  window.addEventListener('popstate', handlePopState)
  onBeforeUnmount(() => window.removeEventListener('popstate', handlePopState))

  return { page, navigate }
}
