import { parse } from 'url';

let fakeSchoolList = [];
for (let i = 0; i < 21; i += 1) {
  fakeSchoolList.push({
    id: i+1,
    schoolCode: i + 20,
    schoolName: '张三',
    city: '城市',
    address: '校园地址',
  });
}


export function getFakeSchoolList(req, res, u, b) {
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
    list: fakeSchoolList,
    pagination: {
      total: fakeSchoolList.length,
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
  getFakeSchoolList
}
