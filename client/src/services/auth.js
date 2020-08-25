import { request } from 'ice';

export default {
  async getRoles () {
    let roles = [];
    try {
      const res = await request.get('/auth/roles');
      roles = res.data.roles;
    } catch (err) {
      console.error(err);
    }
    return roles;
  },
  async login (data) {
    return await request.post('/auth/login', data)
  },
  async logout () {
    return await request.get('/auth/logout');
  }
}
