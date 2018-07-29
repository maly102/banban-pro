import {querySchoolList} from '../services/school';

export default {
  namespace: 'school',

  state: {
    schoolList: [],
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
    }
  },

  reducers: {
    saveSchoolList(state, action) {
      return {
        ...state,
        schoolList: action.resultList,
      };
    },
  },

  subscriptions: {

  }
}
