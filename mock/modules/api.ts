import { Random } from 'mockjs'
import dataDict from './data'

export default [
  {
    url: '/login',
    method: 'post',
    statusCode: 200,
    response: () => {
      return {
        username: 'admin',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyIiwidGltZXN0YW1wIjoxNjYwNTM0MDY3fQ.OmS26-vj_hWmu7YKMZ-ZYTp_UWBxxejnPZsK3tT-LVM',
        permissions: ['pages']
      }
    }
  },
  {
    url: '/pages',
    method: 'get',
    statusCode: 200,
    response: () => {
      const result: any[] = []
      Object.keys(dataDict).forEach((key: string) => {
        const data = dataDict[key]
        // @ts-ignore
        result.push({
          id: key,
          name: data.name,
          thumbnail: data.thumbnail,
          author: data.author,
          createTime: Random.date('yyyy-MM-dd mm:HH:ss'),
          isHome: true
        } as any)
      })
      return result
    }
  },
  {
    url: '/page',
    method: 'get',
    statusCode: 200,
    response: ({ query }: any) => {
      const index: string = query['index']
      return dataDict[index]
    }
  }
]
