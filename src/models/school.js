import {querySchoolList, querySchoolDetail} from '../services/school';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'school',

  state: {
    schoolList: [],
    schoolDetail: {}
  },

  effects: {
    *fetchSchoolList({payload}, {call, put}) {
      const ret = yield call(querySchoolList, payload);

      if (ret && ret.code > 0) {
        yield put({
          type: 'saveSchoolList',
          resultList: {
            list: ret.list,
            pagination: ret.pagination
          },
        });
      }
    },

    *fetchSchoolDetail({payload}, {call, put}) {
      const ret = yield call(querySchoolDetail, payload)

      if (ret && ret.code > 0) {
        yield put({
          type: 'saveSchoolDetail',
          schoolDetail: ret.schoolDetail
        });

        yield put(routerRedux.push({
          pathname: '/school/schoolInfo/detail',
        }))
      }
    }
  },

  reducers: {
    saveSchoolList(state, action) {
      return {
        ...state,
        schoolList: action.resultList,
      };
    },

    saveSchoolDetail(state, action) {
      return {
        ...state,
        schoolDetail: action.schoolDetail,
      };
    },
  },

  subscriptions: {

  }
}
