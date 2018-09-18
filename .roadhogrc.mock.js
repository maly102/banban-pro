import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';
import {
  getFakePublishList,
  getFakePublishDetail,
  getFakeGiveHandList,
  getFakeAcceptedList,
} from './mock/publish';
import { getFakeClientList, getFakeCheckList, getFakeRefuseList } from './mock/client';
import { getFakeSchoolList, getFakeSchoolDetail } from './mock/school';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const UserInfo = {
  phone: '1231212312',
  nick: 'nick',
  desc: 'desc',
  face: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537292441578&di=e4f8c67497c2ccb87b55502229979cee&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201509%2F28%2F20150928101444_FMauR.jpeg',
  pass: 'pass',
  childname: 'childname',
  name: 'name',
  type: 1,
  friendname: 'friendname',
  state: 0,
  schoolid: 1111,
  classesid: 111,
  levelid: 1,
  manager: 2,
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /webApi/LoginReq': (req, res) => {
    const { password, userName, type } = req.body;
    res.send({
      HttpPubParaResp: {
        ret: 0,
        errmsg: '',
        privatepara: '',
      },
      privatepara: {
        LoginResp: {
          UserInfo: UserInfo,
          sid: '1231',
        },
      },
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'POST /api/publish/list': getFakePublishList,
  'POST /api/publish/detail': getFakePublishDetail,
  'POST /api/givehand/list': getFakeGiveHandList,
  'POST /api/accepted/list': getFakeAcceptedList,
  'POST /api/client/list': getFakeClientList,
  'POST /api/check/list': getFakeCheckList,
  'POST /api/refuse/list': getFakeRefuseList,
  'POST /api/school/list': getFakeSchoolList,
  'POST /api/school/detail': getFakeSchoolDetail,
};

export default (noProxy ? {} : delay(proxy, 1000));
