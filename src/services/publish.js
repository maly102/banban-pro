import request from '../utils/request';
import { api } from '../utils/config';

export async function queryPublishList(params) {
  return request(api.api_publish_list, {
    method: 'POST',
    data: params,
  });
}


export async function queryPublishDetail(params) {
  return request(api.api_publish_detail, {
    method: 'POST',
    data: params,
  });
}

export async function queryGivehandList(params) {
  return request(api.api_givehand_list, {
    method: 'POST',
    data: params,
  });
}

export async function queryAcceptedList(params) {
  return request(api.api_accepted_list, {
    method: 'POST',
    data: params,
  });
}
