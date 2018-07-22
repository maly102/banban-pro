import { parse } from 'url';

// mock tableListDataSource
let fakePublishList = [];
for (let i = 0; i < 46; i += 1) {
  fakePublishList.push({
    publishNum: i,
    userCode: i + 10,
    mobile: '1234567890',
    publishTime: '2018-01-01 12:20',
    helpSt: '2018-01-02 12:20',
    helpEt: '2018-01-03 12:20',
    helpCoin: i + 20,
    status: '状态',
    type: '发布类型',
  });
}

export function getFakePublishList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    /*list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },*/
    code: 100,
    message: '',
    publishList: fakePublishList,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getFakePublishList,
};
