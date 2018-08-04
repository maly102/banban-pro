import { queryPublishList, queryPublishDetail, queryGivehandList, queryAcceptedList } from '../services/publish';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'publish',

  state: {
    publishList: [],
    publishDetail: {},

    giveHandList: [],

    acceptedList: []
  },

  effects: {
    *fetchPublishList({ payload }, { call, put }) {
      const ret = yield call(queryPublishList, payload);

      if (ret && ret.code > 0) {
        yield put({
          type: 'savePublishList',
          resultList: {
            list: ret.list,
            pagination: ret.pagination
          },
        });
      }
    },

    *fetchPublishDetail({ payload }, { call, put }) {
      const ret = yield call(queryPublishDetail, payload);
      if (ret && ret.code > 0) {
        yield put({
          type: 'savePublishDetail',
          resultDetail: ret.detail,
        });
        yield put(routerRedux.push({
          pathname: '/publish/publishInfo/detail',
        }))
      }
    },

    *fetchGivehandList({ payload }, { call, put }) {
      const ret = yield call(queryGivehandList, payload);

      if (ret && ret.code > 0) {
        yield put({
          type: 'saveGivehandList',
          resultList: {
            list: ret.list,
            pagination: ret.pagination
          },
        });
      }
    },

    *fetchAcceptedList({ payload }, { call, put }) {
      const ret = yield call(queryAcceptedList, payload);

      if (ret && ret.code > 0) {
        yield put({
          type: 'saveAcceptedList',
          resultList: {
            list: ret.list,
            pagination: ret.pagination
          },
        });
      }
    }
  },

  reducers: {
    savePublishList(state, action) {
      return {
        ...state,
        publishList: action.resultList,
      };
    },

    savePublishDetail(state, action) {
      return {
        ...state,
        publishDetail: action.resultDetail,
      };
    },

    saveGivehandList(state, action) {
      return {
        ...state,
        giveHandList: action.resultList,
      };
    },

    saveAcceptedList(state, action) {
      return {
        ...state,
        acceptedList: action.resultList,
      };
    }
  },
};
