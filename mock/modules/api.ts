import { Random } from 'mockjs'
import dataDict from './data'
import { Covid19Data } from './data'

const restData = [
  {
    id: '1',
    name: '新增确诊人数',
    author: Random.name(),
    createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    updateDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    method: 'GET',
    url: '/getNew',
    headers: { accept: '*/*', 'content-type': 'application/json' }
  },
  {
    id: '2',
    name: '累计确诊人数',
    author: Random.name(),
    createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    updateDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    method: 'GET',
    url: '/getTotal',
    headers: { accept: '*/*', 'content-type': 'application/json' }
  },
  {
    id: '3',
    name: '无症状感染人数',
    author: Random.name(),
    createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    updateDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    method: 'GET',
    url: '/getNoSymptom',
    headers: { accept: '*/*', 'content-type': 'application/json' }
  },
  {
    id: '4',
    name: '风险地区个数',
    author: Random.name(),
    createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    updateDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    method: 'GET',
    url: '/getRiskArea',
    headers: { accept: '*/*', 'content-type': 'application/json' }
  }
]

const scriptList = [
  {
    id: '1',
    name: '过滤函数',
    author: Random.name(),
    createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    updateDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    code: 'return resp.filter(el => el.value > 10)',
    type: 'Javascript'
  },
  {
    id: '2',
    name: '转化函数',
    author: Random.name(),
    createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    updateDate: Random.date('yyyy-MM-dd mm:HH:ss'),
    code: 'return resp.map(el => {return { value: el.value, label: el.name}})',
    type: 'Javascript'
  }
]

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
    url: '/page/page',
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
    url: '/page/page/:id',
    method: 'get',
    statusCode: 200,
    response: ({ url }: any) => {
      const index = url.split('/')[3]
      return dataDict[index] || dataDict['1b0acf36-d309-43fe-9e0a-7b6942e2f953']
    }
  },
  {
    url: '/getNew',
    method: 'get',
    statusCode: 200,
    response: () => {
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
      return Covid19Data.filter((el) => el.RiskArea > 0).map((el) => {
        return {
          label: el.province,
          value: el.RiskArea
        }
      })
    }
  },
  {
    url: '/getMaxData',
    method: 'get',
    statusCode: 200,
    response: () => {
      const maxData = {
        maxNew: 0,
        maxNoSymptom: 0,
        maxTotal: 0,
        maxRiskArea: 0
      }
      Covid19Data.forEach((el) => {
        maxData['maxNew'] = maxData['maxNew'] > el['New'] ? maxData['maxNew'] : el['New']
        maxData['maxNoSymptom'] =
          maxData['maxNoSymptom'] > el['NoSymptom'] ? maxData['maxNoSymptom'] : el['NoSymptom']
        maxData['maxTotal'] = maxData['maxTotal'] > el['total'] ? maxData['maxTotal'] : el['total']
        maxData['maxRiskArea'] =
          maxData['maxRiskArea'] > el['RiskArea'] ? maxData['maxRiskArea'] : el['RiskArea']
      })
      return maxData
    }
  },
  {
    url: '/dataset/static/:id',
    method: 'get',
    statusCode: 200,
    response: ({ url }: any) => {
      const id = url.split('/')[3]
      if (id === '1') {
        return {
          data: Covid19Data.map((el) => {
            return {
              label: el.province,
              value: el.New
            }
          }),
          id: '1',
          name: '新增人数',
          author: Random.name(),
          createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
          updateDate: Random.date('yyyy-MM-dd mm:HH:ss')
        }
      } else if (id === '2') {
        return {
          data: Covid19Data.map((el) => {
            return {
              label: el.province,
              value: el.NoSymptom
            }
          }),
          id: '2',
          name: '新增无症状人数',
          author: Random.name(),
          createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
          updateDate: Random.date('yyyy-MM-dd mm:HH:ss')
        }
      } else if (id === '3') {
        return {
          data: Covid19Data.map((el) => {
            return {
              label: el.province,
              value: el.total
            }
          }),
          id: '3',
          name: '累计确诊人数',
          author: Random.name(),
          createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
          updateDate: Random.date('yyyy-MM-dd mm:HH:ss')
        }
      } else {
        return {
          data: Covid19Data.map((el) => {
            return {
              label: el.province,
              value: el.RiskArea
            }
          }),
          id: '4',
          name: '现存风险地区',
          author: Random.name(),
          createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
          updateDate: Random.date('yyyy-MM-dd mm:HH:ss')
        }
      }
    }
  },
  {
    url: '/dataset/static/',
    method: 'get',
    statusCode: 200,
    response: () => {
      return [
        {
          id: '1',
          name: '新增人数'
        },
        {
          id: '2',
          name: '新增无症状人数'
        },
        {
          id: '3',
          name: '累计确诊人数'
        },
        {
          id: '4',
          name: '现存风险地区'
        }
      ]
    }
  },
  {
    url: '/dataset/static/:id',
    method: 'put',
    statusCode: 202,
    response: ({ body }) => {
      return body
    }
  },
  {
    url: '/dataset/static/',
    method: 'post',
    statusCode: 201,
    response: ({ body }) => {
      return {
        ...body,
        id: Random.integer(5, 100),
        createDate: Random.date('yyyy-MM-dd mm:HH:ss'),
        updateDate: Random.date('yyyy-MM-dd mm:HH:ss')
      }
    }
  },
  {
    url: '/dataset/rest/',
    method: 'get',
    statusCode: 200,
    response: () => {
      return restData
    }
  },
  {
    url: '/dataset/rest/:id',
    method: 'get',
    statusCode: 200,
    response: ({ url }: any) => {
      const id = url.split('/')[3]
      return restData.filter((ele) => ele.id === id)[0]
    }
  },
  {
    url: '/dataset/script/',
    method: 'get',
    statusCode: 200,
    response: () => {
      return scriptList
    }
  },
  {
    url: '/dataset/script/:id',
    method: 'get',
    statusCode: 200,
    response: ({ url }) => {
      const id = url.split('/')[3]
      return scriptList.filter((el) => el.id === id)[0]
    }
  }
]
