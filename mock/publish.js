import { parse } from 'url';

// mock tableListDataSource
let fakePublishList = [];
for (let i = 0; i < 46; i += 1) {
  fakePublishList.push({
    id: i+1,
    publishNum: i,
    clientCode: i + 10,
    mobile: '1234567890',
    publishTime: '2018-01-01 12:20',
    helpSt: '2018-01-02 12:20',
    helpEt: '2018-01-03 12:20',
    helpCoin: i + 20,
    status: '状态',
    type: '发布类型',
  });
}

let fakeGiveHandList = [];
for (let i = 0; i < 50; i += 1) {
  fakeGiveHandList.push({
    id: i+1,
    clientCode: i + 10,
    mobile: '1234567890',
    clientName: '用户姓名',
    relationShip: '父子',
    helpCount: i+3,
    helpCoin: i + 20,
    pickUp: i+4,
    send: i+5,
    takeCare: i+6,
  });
}

let fakeAcceptedList = [];
for (let i = 0; i < 33; i += 1) {
  fakeAcceptedList.push({
    id: i+1,
    clientCode: i + 1,
    mobile: '1234567890',
    clientName: '用户姓名',
    relationShip: '父子',
    acceptCount: i+10,
    helpCoin: i + 20,
    pickUp: i+11,
    send: i+12,
    takeCare: i+13,
  });
}

export function getFakePublishList(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = (b && b.body) || req.body;

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
    list: fakePublishList,
    pagination: {
      total: fakePublishList.length,
      pageSize,
      current: parseInt(params.pageIndex, 10) || 1,
    }
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getFakePublishDetail(req, res, u, b) {
  res.json({
    code: 100,
    message: '',
    detail: {
      publishNum: 1,
      userCode: 1 + 10,
      mobile: '1234567890',
      publishTime: '2018-01-01 12:20',
      helpSt: '2018-01-02 12:20',
      helpEt: '2018-01-03 12:20',
      helpCoin: 1 + 20,
      status: '状态',
      type: '发布类型',
    }
  });
}

export function getFakeGiveHandList(req, res, u, b) {
  const params = (b && b.body) || req.body;

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
    list: fakeGiveHandList,
    pagination: {
      total: fakeGiveHandList.length,
      pageSize,
      current: parseInt(params.pageIndex, 10) || 1,
    }
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getFakeAcceptedList(req, res, u, b) {
  const params = (b && b.body) || req.body;

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
    list: fakeAcceptedList,
    pagination: {
      total: fakeAcceptedList.length,
      pageSize,
      current: parseInt(params.pageIndex, 10) || 1,
    }
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getFakePublishList,
  getFakePublishDetail,
  getFakeGiveHandList,
  getFakeAcceptedList
};
