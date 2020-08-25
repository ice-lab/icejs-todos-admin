import { request } from 'ice';

export default {
  async list({ current, pageSize }) {
    let data = {};
    try {
      const res = await request.get(`/users?current=${current}&size=${pageSize}`);
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  }
}
