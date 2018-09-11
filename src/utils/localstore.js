import config from './config';

export function storeUserInfo(user) {
  sessionStorage.setItem(config.userKey, user ? JSON.stringify(user) : '');
}

export function storeSid(sid) {
  sessionStorage.setItem(config.sidKey, sid);
}

export function getUserInfo() {
  let user = sessionStorage.getItem(config.userKey);
  return user ? JSON.parse(user) : undefined;
}

export function getSid() {
  let sid = sessionStorage.getItem(config.sidKey);
  return sid;
}

export function clearStoreItems() {
  sessionStorage.removeItem(config.userKey);
}
