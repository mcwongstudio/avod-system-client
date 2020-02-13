import axios from 'axios';
import Qs from 'qs';

import getUrl from './getUrl'

const timeout = 3000;

function checkStatus(response) {
  return response;
}

export default function request(options, formType = 'FORM') {
  // formType，post请求的数据类型，默认FORM格式，可选项JSON、FORM、FILE
  const {method, url, data } = options;
  var headers = {};
  headers['Accept'] = '*/*';
  // 获取token
  if(data.token) {
    headers = {
      'Authorization': data.token
    }
  }

  if(method === 'POST') {
    let DATA
    if(formType === 'FORM') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      DATA = Qs.stringify(data);
    }
    else if(formType === 'FILE') {
      headers['Content-Type'] = 'form-data'
      DATA = data
    }

      
      return axios({
        timeout,
        method,
        headers,
        url,
        data: DATA
      })
        .then(
          checkStatus
        )
        .catch(err => {
          return err;
        })
    
    
  }
  else if(method === 'GET') {
    return axios({
      timeout,
      method,
      data,
      headers,
      url: getUrl(url, data)
    }).then(res => {
      return res
    }).catch(err => {
      return err
    })
  }
}
