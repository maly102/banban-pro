import request from '../utils/request';
import { api } from '../utils/config';

export async function queryClientList(params) {
  return request(api.api_client_list, {
    method: 'POST',
    data: params,
  });
}

export async function queryCheckList(params) {
  return request(api.api_check_list, {
    method: 'POST',
    data: params,
  });
}

export async function queryRefuseList(params) {
  return request(api.api_refuse_list, {
    method: 'POST',
    data: params,
  });
}
