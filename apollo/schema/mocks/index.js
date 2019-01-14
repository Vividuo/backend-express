const Mock = require('mockjs')
const { MockList } = require('graphql-tools')
const mocks = {
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF
  Parent: () => ({
    name: () => Mock.Random.cname()
  }),
  Leaf: () => ({
    name: () => Mock.Random.cword(3)
  }),
  Tree: () => ({
    name: () => Mock.Random.cword(3),
    leafs: () => new MockList(8)
  }),
  ProjectGroupListPayload: () => ({
    total: () => 5,
    list: () => new MockList(8)
  }),
  ProjectGroup: () => ({
    groupName: () => Mock.Random.cword(10),
    projectTotalNum: () => Mock.Random.natural(5, 50),
    status: () => Mock.Random.pick(['1', '2', '3']),
    createdBy: () => Mock.Random.cname(),
    createdAt: () => Mock.Random.date('T')
  }),
  Project: () => ({
    projectName: () => Mock.Random.cword(10),
    unitName: () => Mock.Randowm.cword(5),
    unitPerson: () => Mock.Random.cname(),
    guideTitle: () => Mock.Random.cword(8),
    guideCategoryName: () => Mock.Random.cword(4)
  }),
  Dictionary: () => ({
    dictionaryName: () => Mock.Random.cword(5)
  }),
  ProjectGroupPropose: () => ({
    remark: () => Mock.Random.cword(20)
  })
}
module.exports = mocks
