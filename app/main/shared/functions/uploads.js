import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export default function upload(data) {
    const request = AxiosConfig.post(Constants.API_UPLOAD.upload, data);
    return request;
}