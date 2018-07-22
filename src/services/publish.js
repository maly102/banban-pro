import request from '../utils/request';
import { api } from '../utils/config';

export async function queryPublishList(params) {
  return request(api.api_publish_list, {
    method: 'POST',
    data: params,
  });
}
