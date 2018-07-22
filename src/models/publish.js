import { queryPublishList } from '../services/publish';

export default {
  namespace: 'publish',

  state: {
    publishList: [],
  },

  effects: {
    *fetchPublishList({ payload }, { call, put }) {
      const ret = yield call(queryPublishList, payload);

      if (ret && ret.code > 0) {
        yield put({
          type: 'savePublishList',
          result: {
            list: ret.publishList,
            pagination: {
              total: ret.publishList.length,
              current: payload ? payload.pageIndex : 1,
            },
          },
        });
      }
    },
  },

  reducers: {
    savePublishList(state, action) {
      return {
        ...state,
        publishList: action.result,
      };
    },
  },
};
