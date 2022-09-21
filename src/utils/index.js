/* eslint-disable */
export function resloveToBase64(file) {
  return new Promise((reslove) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      reslove(e.target.result)
    }
  })
}
