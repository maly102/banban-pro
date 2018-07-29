import { queryClientList, queryCheckList, queryRefuseList } from '../services/client';

export default {
  namespace: 'client',

  state: {
    clientList: [],
    checkList: [],
    refuseList: [],
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

    *fetchCheckList({ payload }, { call, put }) {
      const ret = yield call(queryCheckList, payload);

      if (ret && ret.code > 0) {
        yield put({
          type: 'saveCheckList',
          resultList: {
            list: ret.list,
            pagination: ret.pagination
          },
        });
      }
    },

    *fetchRefuseList({ payload }, { call, put }) {
      const ret = yield call(queryRefuseList, payload);

      if (ret && ret.code > 0) {
        yield put({
          type: 'saveRefuseList',
          resultList: {
            list: ret.list,
            pagination: ret.pagination
          },
        });
      }
    }
  },

  reducers: {
    saveClientList(state, action) {
      return {
        ...state,
        clientList: action.resultList,
      };
    },

    saveCheckList(state, action) {
      return {
        ...state,
        checkList: action.resultList,
      };
    },

    saveRefuseList(state, action) {
      return {
        ...state,
        refuseList: action.resultList,
      };
    }
  },
};
