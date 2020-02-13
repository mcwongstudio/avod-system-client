
import request from '@/utils/request';
import config from '@/config';

export default async function setLoginStatus() {
    try {
        const data = {
            token: localStorage.token
        }
        return await request({
            method: 'GET',
            url: `${config.apiUrl}/users/current`,
            data
        }).then((res) => {
            return res
            }).catch(() => {
            return false
        })
    }
    catch {
        return false 
    }
}