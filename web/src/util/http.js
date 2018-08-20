import Vue from 'vue'
let http = (type, options) => {
  let data = {}
  if (options.url.indexOf('/secure/') > -1) {
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      data.access_token = token
    } else {
      window.location.href = '/token'
    }
  }
  data.value = JSON.stringify(options.data || {})
  return new Promise((resolve, reject) => {
    Vue.http[type](options.url, {
      params: data
    }, { emulateJSON: true}).then(response => {
      if (response.status === 200) {
        let json = response.body
        if(json.tokenStatus !== 'success') {
          window.location.href = '/token'
          return
        }
        if(json.returnCode !== 'success') {
          reject(response)
        } else {
          resolve(json)
        }
      } else {
        reject(response)
      }
    }).catch(response => {
      reject(response)
    })
  })
}
export default {
  get: (options) => {
    return http('get', options)
  },
  post: (options) => {
    return http('post', options)
  },
  put: (options) => {
    return http('put', options)
  },
  delete: (options) => {
    return http('delete', options)
  }
}
