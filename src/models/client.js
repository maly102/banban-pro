import { queryClientList } from '../services/client';

export default {
  namespace: 'client',

  state: {
    clientList: [],
  },

  effects: {
    *fetchClientList({ payload }, { call, put }) {
      const ret = yield call(queryClientList, payload);

      if (ret && ret.code > 0) {
        yield put({
          type: 'saveClientList',
          resultList: {
            list: ret.list,
            pagination: ret.pagination
          },
        });
      }
    },
  },

  reducers: {
    saveClientList(state, action) {
      return {
        ...state,
        clientList: action.resultList,
      };
    },
  },
};
