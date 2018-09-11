//import fetch from 'dva/fetch';
import axios from 'axios';
import { message, notification } from 'antd';
import { routerRedux } from 'dva/router';
import store from '../index';
import fileSaver from 'file-saver';
import { getPageId } from './utils';
import envConfig from '../envConfig';

let hideUpdating = undefined;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误），请重新登录。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function handleError(err) {
  if (err.response) {
    let response = err.response;
    let resMsg = response.data ? response.data.message : '';
    const errortext = codeMessage[response.status] || resMsg;
    notification.error({
      message: `请求错误 ${response.status}`,
      description: errortext,
    });

    let status = response.status;
    const { dispatch } = store;
    if (status === 401) {
      dispatch(routerRedux.push('/user/login'));
    } else if (status === 403) {
      dispatch(routerRedux.push('/exception/403'));
    } else if (status <= 504 && status >= 500) {
      dispatch(routerRedux.push('/exception/500'));
    } else if (status >= 404 && status < 422) {
      dispatch(routerRedux.push('/exception/404'));
    }
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  } else {
    // Something happened in setting up the request that triggered an Error
    notification.error({
      message: `请求错误`,
      description: err.message,
    });
  }
}

//共通请求头部
function requestHeader(options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  newOptions.headers = {
    Accept: 'application/json',
    /*authorization: token ? 'Bearer ' + token : '',
    'x-pagination-size':
      options && options.pageSize ? options.pageSize : Constanst.pageSize,
    'x-plat-type': options && options.platType ? options.platType : '',
    'x-third-id': options && options.thirdId ? options.thirdId : '',
    'x-company-id': getCompanyId(),
    'x-company-key': Constanst.companyKey,
    'x-employee-id': getEmployeeId(),
    'x-page-id': 15,
    'x-user-id': getUserId(),
    'x-role-id': getUserRoleId(),
    'x-pagination-index':
      options && options.pageIndex ? options.pageIndex - 1 : '',*/
    ...newOptions.headers,
  };

  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
    } else {
      // newOptions.body is FormData
      newOptions.headers['Content-Type'] = 'multipart/form-data';
    }
  }
  return newOptions;
}

//获取form value
function getFormDataValue(fValue) {
  if (fValue === undefined || fValue === null) {
    return '';
  } else {
    return fValue;
  }
}

//根据环境URL格式化
function formatUrl(url) {
  return envConfig.host + url + '?' + envConfig.commonParam;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let newOptions = requestHeader(options);
  return axios(formatUrl(url), newOptions)
    .then(response => {
      if (newOptions.method && newOptions.method.toUpperCase() === 'HEAD') {
        return { success: true };
      } else if (
        (newOptions.method && newOptions.method.toUpperCase() === 'DELETE') ||
        response.status === 204
      ) {
        return { success: true };
      }
      let res = response.data;
      if (res && res.HttpPubParaResp.ret === 0) {
        return res.privatepara;
      } else if (res.HttpPubParaResp.errmsg) {
        message.error(res.HttpPubParaResp.errmsg);
      } else {
        return res.privatepara;
      }
    })
    .catch(handleError);
}

/**
 * 文件上传
 *
 */
export function upload(url, options) {
  let formParam = new FormData();
  if (options.files && options.files.length > 0) {
    // eslint-disable-next-line
    options.files.map(file => {
      if (file && file.name) {
        formParam.append(file.fieldName ? file.fieldName : 'files', file, file.name);
      }
    });
  } else if (options.file) {
    formParam.append(
      options.file.fieldName ? options.file.fieldName : 'file',
      options.file,
      options.file.name
    );
  }

  if (options.data) {
    let keys = Object.keys(options.data);
    if (keys && keys.length > 0) {
      keys.map(key => {
        return formParam.append(key, getFormDataValue(options.data[key]));
      });
    }
  }
  options.data = formParam;
  options.method = 'POST';
  let newOptions = requestHeader(options);
  newOptions['onUploadProgress'] = ({ total, loaded }) => {
    let percent = Math.round((loaded / total) * 100).toFixed(0);
    if (!hideUpdating) {
      hideUpdating = message.loading(`正在处理上传文件...`, 0);
    }
    if (typeof newOptions.onProgress === 'function') {
      newOptions.onProgress(percent);
    }
  };

  return axios(formatUrl(url), newOptions)
    .then(response => {
      let res = response.data;
      if (res && res.code > 0) {
        if (typeof newOptions.onSuccess === 'function') {
          if (hideUpdating) {
            hideUpdating();
            hideUpdating = undefined;
          }
          newOptions.onSuccess(res);
        }
      } else {
        if (typeof newOptions.onError === 'function') {
          if (hideUpdating) {
            hideUpdating();
            hideUpdating = undefined;
          }
          newOptions.onError(res);
        }
      }
      return res;
    })
    .catch(e => {
      if (typeof newOptions.onError === 'function') {
        if (hideUpdating) {
          hideUpdating();
          hideUpdating = undefined;
        }
        newOptions.onError(`上传文件出错(status: ${e.response.status})`);
      }
    });
}

/**
 * 文件下载
 *
 */
export function download(url, options) {
  let newOptions = requestHeader(options);
  newOptions.headers['Accept'] = 'application/octet-stream';
  newOptions['responseType'] = 'blob';
  return axios(formatUrl(url), newOptions)
    .then(res => {
      if (newOptions.method && newOptions.method.toUpperCase() === 'HEAD') {
        return { success: true };
      } else {
        if (res.data && res.data.code && res.data.code < 0) {
          message.error(res.data.message);
          return undefined;
        }
        //做成下载文件并下载
        let blob = res.data;
        let contentDisposition = res.headers['content-disposition'];
        let filename = decodeURI(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)[1]
        );
        fileSaver.saveAs(blob, filename);
        return res;
      }
    })
    .catch(e => {
      if (e.response.data && e.response.data.message) {
        message.error(e.response.data.message);
      } else {
        message.error(`下载文件出错(status: ${e.response.status})`);
      }
    });
}
