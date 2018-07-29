import { parse } from 'url';

let fakeClientList = [];
for (let i = 0; i < 32; i += 1) {
  fakeClientList.push({
    id: i+1,
    clientCode: i + 10,
    mobile: '1234567890',
    registerTime: '2018-01-01 12:20',
    isCompleted: '否',
    clientName: '张三',
    relationShip: '父母',
    helpCoin: 20,
    childName: '张小猫'
  });
}

let fakeCheckList = [];
for (let i = 0; i < 73; i += 1) {
  fakeCheckList.push({
    id: i+1,
    clientCode: i + 10,
    mobile: '1234567890',
    registerTime: '2018-01-01 12:20',
    isCompleted: '否',
    clientName: '张三',
    relationShip: '父母',
    helpCoin: 20,
    childName: '张小猫',
    childNickName: '小猫'
  });
}

let fakeRefuseList = [];
for (let i = 0; i < 55; i += 1) {
  fakeRefuseList.push({
    id: i+1,
    clientCode: i + 10,
    mobile: '1234567890',
    registerTime: '2018-01-01 12:20',
    isCompleted: '否',
    clientName: '张三',
    relationShip: '父母',
    helpCoin: 20,
    childName: '张小猫',
    childNickName: '小猫'
  });
}

export function getFakeClientList(req, res, u, b) {
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
    list: fakeClientList,
    pagination: {
      total: fakeClientList.length,
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

export function getFakeCheckList(req, res, u, b) {
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
    list: fakeCheckList,
    pagination: {
      total: fakeCheckList.length,
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
export function getFakeRefuseList(req, res, u, b) {
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
    list: fakeRefuseList,
    pagination: {
      total: fakeRefuseList.length,
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
  getFakeClientList,
  getFakeCheckList,
  getFakeRefuseList
}