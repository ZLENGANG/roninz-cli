import { get } from "https";
import axios from "axios";

function getNpmInfo(npmName) {
  const registry = 'https://registry.npmjs.org/';
  const url = `${registry}${npmName}`

  return axios.get(url).then(resp => {
    try {
      return resp.data;
    } catch (err) {
      return Promise.reject(err);
    }
  });
}

export const getLatestVersion = (npmName) => {
  return getNpmInfo(npmName).then(data => {
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      log.error('没有 latest 版本号');
      return Promise.reject(new Error('没有 latest 版本号'));
    }
    return data['dist-tags'].latest;
  })
}
