import request from '@/utils/request';
import buildURL from '@/utils/buildURL';
import { stringify } from 'qs';

export async function getShippingDevices(params?: any) {
  return request(
    buildURL(`/ims/api/v1/bmims-shapingmg/shaping-machines/all/?${stringify(params)}`),
    {
      method: 'GET',
    },
  );
}
