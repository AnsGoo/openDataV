import { Random } from 'mockjs'
import dataDict from './data'
import { Covid19Data } from './data'

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
  },
  {
    url: '/getNew',
    method: 'get',
    statusCode: 200,
    response: () => {
      // console.log(Covid19Data)
      return Covid19Data.filter((el) => el.New > 0).map((el) => {
        return {
          label: el.province,
          value: el.New
        }
      })
    }
  },
  {
    url: '/getTotal',
    method: 'get',
    statusCode: 200,
    response: () => {
      // console.log(Covid19Data)
      return Covid19Data.map((el) => {
        return {
          label: el.province,
          value: el.total
        }
      })
    }
  },
  {
    url: '/getNoSymptom',
    method: 'get',
    statusCode: 200,
    response: () => {
      // console.log(Covid19Data)
      return Covid19Data.filter((el) => el.NoSymptom > 0).map((el) => {
        return {
          label: el.province,
          value: el.NoSymptom
        }
      })
    }
  },
  {
    url: '/getRiskArea',
    method: 'get',
    statusCode: 200,
    response: () => {
      // console.log(Covid19Data)
      return Covid19Data.filter((el) => el.RiskArea > 0).map((el) => {
        return {
          label: el.province,
          value: el.RiskArea
        }
      })
    }
  }
]
