import request from '../utils/request';
import { api } from '../utils/config';

export async function queryClientList(params) {
  return request(api.api_client_list, {
    method: 'POST',
    data: params,
  });
}
