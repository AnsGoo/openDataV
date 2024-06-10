export interface RequestConfig {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  url: string
  headers: Record<string, any>
  params: Record<string, any>
  data: Record<string, any>
}
export interface RequestInstance {
  request: (config: RequestConfig) => Promise<any>
}
export const useRequest = () => {
  return useDefaultRequest()
}

function resolveBody(data: Record<string, any> | string, headers: Headers) {
  const contentType = headers.get('Content-Type') || 'applocation/json'
  const body = JSON.parse(JSON.stringify(data))
  if (contentType.includes('applocation/json')) {
    return Object.keys(body).length > 0 ? JSON.stringify(body) : undefined
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = new FormData()
    Object.keys(body).forEach((el) => formData.append(el, body[el]))
    return formData
  } else {
    return Object.keys(body).length > 0 ? JSON.stringify(body) : undefined
  }
}

function useDefaultRequest(): RequestInstance {
  const request = async (config: RequestConfig) => {
    const { headers, method, url, params, data } = config
    let realUrl = url
    if (method.toUpperCase() === 'GET') {
      const parmasKeys = Object.keys(JSON.parse(JSON.stringify(params)))
      const queryList = parmasKeys.map((el) => {
        return `${el}=${encodeURIComponent(params[el])}`
      })
      if (queryList.length > 0) {
        realUrl = realUrl + '?' + queryList.join('&')
      }
    }

    const resp = await window.fetch(realUrl, {
      headers: new Headers(headers),
      method,
      body: resolveBody(data, new Headers(headers))
    })
    console.log(resp)
    return {
      status: resp.status,
      data: await resp.json()
    }
  }
  return { request }
}
