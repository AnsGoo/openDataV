import { Random } from 'mockjs'
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
      return [
        {
          id: '1b0acf36-d309-43fe-9e0a-7b6942e2f953',
          name: '全国疫情分布图',
          thumbnail: 'http://image.xingxingzaixian.fun/pages/1.png',
          author: '成海文',
          createTime: Random.date('yyyy-MM-dd mm:HH:ss'),
          isHome: true
        },
        {
          id: '8c68b895-2408-4c43-b652-1aa7d0330870',
          name: '全国人口实时迁移图',
          thumbnail: 'http://image.xingxingzaixian.fun/pages/2.png',
          author: '成海文',
          createTime: Random.date('yyyy-MM-dd mm:HH:ss'),
          isHome: false
        },
        {
          id: '8c68b895-2408-4c43-b652-1aa7d0330870',
          name: '全国人口实时迁移图',
          thumbnail: 'http://image.xingxingzaixian.fun/pages/3.png',
          author: '成海文',
          createTime: Random.date('yyyy-MM-dd mm:HH:ss'),
          isHome: false
        },
        {
          id: '8c68b895-2408-4c43-b652-1aa7d0330870',
          name: '全国人口实时迁移图',
          thumbnail: 'http://image.xingxingzaixian.fun/pages/4.png',
          author: '成海文',
          createTime: Random.date('yyyy-MM-dd mm:HH:ss'),
          isHome: false
        }
      ]
    }
  }
]
