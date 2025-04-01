export function scrollToBottom() {
  /**
   * 画面の見えている範囲の一番下の位置
   */
  // const viewportBottom = window.innerHeight + window.scrollY

  /**
   * ページ全体の一番下の位置
   */
  const pageBottom = document.body.scrollHeight

  // const diff = pageBottom - viewportBottom

  // if (16 < diff) return

  window.scrollTo(0, pageBottom)
}
