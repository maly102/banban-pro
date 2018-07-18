// import fetch from 'dva/fetch';
import axios from 'axios'
import {message, notification} from 'antd'
import {routerRedux} from 'dva/router'
import fileSaver from 'file-saver'
import store from '../index'
import Constanst from './config'
import envConfig from '../envConfig'

let hideUpdating

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

function handleError(err) {
  if(err.response) {
    const response = err.response;
    const resMsg = response.data ? response.data.message : '';

    const errortext = resMsg || codeMessage[response.status]
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errortext,
    })

    const status = response.status
    const {dispatch} = store
    if (status === 401) {
      dispatch(routerRedux.push('/user/login'))
    }else if (status === 403) {
      dispatch(routerRedux.push('/exception/403'))
    }else if (status <= 504 && status >= 500) {
      dispatch(routerRedux.push('/exception/500'))
    }else if (status >= 404 && status < 422) {
      dispatch(routerRedux.push('/exception/404'))
    }
  }else if(err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  }else{
    // Something happened in setting up the request that triggered an Error
    notification.error({
      message: `请求错误`,
      description: err.message,
    })
  }
}

// 获得token
function getToken() {
  return sessionStorage.getItem(Constanst.tokenKey)
}

// 获得companyID
function getCompanyId() {
  const userInfo = sessionStorage.getItem(Constanst.userKey)
  if (userInfo) {
    const user = JSON.parse(userInfo)
    return user.companyId
  }
  return ''
}

// 获得UserId
function getUserId() {
  const userInfo = sessionStorage.getItem(Constanst.userKey)
  if (userInfo) {
    const user = JSON.parse(userInfo)
    return user.id
  }
  return ''
}

// 获得User Role
function getUserRoleId() {
  const userInfo = sessionStorage.getItem(Constanst.userKey)
  if (userInfo) {
    const user = JSON.parse(userInfo)
    return user.userRoleId
  }
  return ''
}

// 获得employeeID
function getEmployeeId() {
  const userInfo = sessionStorage.getItem(Constanst.userKey)
  if (userInfo) {
    const user = JSON.parse(userInfo)
    return user.employeeId
  }
  return ''
}

// 获得PageId
function getCurrentPageId() {
  let pathKey = window.location.hash
  if (pathKey) {
    if (pathKey.indexOf('#') >= 0) {
      pathKey = pathKey.substr(1, pathKey.length - 1)
    }
  }
  return ''
}

// 共通请求头部
function requestHeader(options) {
  const defaultOptions = {
    credentials: 'include',
  }
  const newOptions = {...defaultOptions, ...options}
  const token = getToken()
  newOptions.headers = {
    Accept: 'application/json',
    /*authorization: token ? `Bearer ${  token}` : '',
    'x-pagination-size':
      options && options.pageSize ? options.pageSize : Constanst.pageSize,
    'x-plat-type': options && options.platType ? options.platType : '',
    'x-third-id': options && options.thirdId ? options.thirdId : '',
    'x-company-id': getCompanyId(),
    'x-company-key': Constanst.companyKey,
    'x-employee-id': getEmployeeId(),
    'x-page-id': 15,
    'x-user-id': getUserId(),
    'x-role-id': getUserRoleId(),*/
    'x-pagination-index':
      options && options.pageIndex ? options.pageIndex - 1 : '',
    ...newOptions.headers,
  }

  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers['Content-Type'] = 'application/json; charset=utf-8'
    } else {
      // newOptions.body is FormData
      newOptions.headers['Content-Type'] = 'multipart/form-data'
    }
  }
  return newOptions
}

// 获取form value
function getFormDataValue(fValue) {
  if (fValue === undefined || fValue === null) {
    return ''
  } else {
    return fValue
  }
}

// 根据环境URL格式化
function formatUrl(url) {
  if(envConfig.mockHost) {
    return envConfig.mockHost + envConfig.repositoryId + url;
  }
  return url;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const newOptions = requestHeader(options)
  if(!newOptions.data && newOptions.body) {
    newOptions.data = newOptions.body
  }
  return axios(formatUrl(url), newOptions)
    .then(response => {
      if (newOptions.method && newOptions.method.toUpperCase() === 'HEAD') {
        return {success: true}
      } else if ((newOptions.method && newOptions.method.toUpperCase() === 'DELETE') || response.status === 204) {
        return {success: true}
      }
      const res = response.data
      if (res && res.code > 0) {
        return res
      } else if (res.message) {
        message.error(res.message)
      } else {
        return res
      }
    })
    .catch(handleError)
}

/**
 * 文件上传
 *
 */
export function upload(url, options) {
  const formParam = new FormData()
  if (options.files && options.files.length > 0) {
    // eslint-disable-next-line
    options.files.map(file => {
      if (file && file.name) {
        formParam.append(file.fieldName ? file.fieldName : 'files', file, file.name)
      }
    })
  } else if (options.file) {
    formParam.append(options.file.fieldName ? options.file.fieldName : 'file', options.file, options.file.name)
  }

  if (options.data) {
    const keys = Object.keys(options.data)
    if (keys && keys.length > 0) {
      keys.map(key => {
        return formParam.append(key, getFormDataValue(options.data[key]))
      })
    }
  }
  options.data = formParam
  options.method = 'POST'
  const newOptions = requestHeader(options)
  newOptions.onUploadProgress = ({total, loaded}) => {
    const percent = Math.round(loaded / total * 100).toFixed(0)
    if (!hideUpdating) {
      hideUpdating = message.loading(`正在处理上传文件...`, 0)
    }
    if (typeof newOptions.onProgress === 'function') {
      newOptions.onProgress(percent)
    }
  }

  return axios(formatUrl(url), newOptions)
    .then(response => {
      const res = response.data
      if (res && res.code > 0) {
        if (typeof newOptions.onSuccess === 'function') {
          if(hideUpdating) {
            hideUpdating()
            hideUpdating = undefined
          }
          newOptions.onSuccess(res)

        }
      } else if (typeof newOptions.onError === 'function') {
          if(hideUpdating) {
            hideUpdating()
            hideUpdating = undefined
          }
          newOptions.onError(res)
        }
      return res
    })
    .catch(e => {
      if (typeof newOptions.onError === 'function') {
        if(hideUpdating) {
          hideUpdating()
          hideUpdating = undefined
        }
        newOptions.onError(`上传文件出错(status: ${e.response.status})`)
      }
    })
}

/**
 * 文件下载
 *
 */
export function download(url, options) {
  const newOptions = requestHeader(options)
  newOptions.headers.Accept = 'application/octet-stream'
  newOptions.responseType = 'blob'
  return axios(formatUrl(url), newOptions)
    .then(res => {
      if (newOptions.method && newOptions.method.toUpperCase() === 'HEAD') {
        return {success: true}
      } else {
        if (res.data && res.data.code && res.data.code < 0) {
          message.error(res.data.message)
          return undefined
        }
        // 做成下载文件并下载
        const blob = res.data
        const contentDisposition = res.headers['content-disposition']
        const filename = decodeURI(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)[1]
        )
        fileSaver.saveAs(blob, filename)
      }
    })
    .catch(e => {
      if (e.response.data && e.response.data.message) {
        message.error(e.response.data.message)
      } else {
        message.error(`下载文件出错(status: ${e.response.status})`)
      }
    })
}
