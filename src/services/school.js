import request from '../utils/request';
import { api } from '../utils/config';

export async function querySchoolList(params) {
  return request(api.api_school_list, {
    method: 'POST',
    data: params,
  });
}
