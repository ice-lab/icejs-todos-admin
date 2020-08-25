import { request } from 'ice';

export default {
  async list ({ current, pageSize, openId }) {
    let data = {};
    try {
      let URL = `/todos?current=${current}&size=${pageSize}`
      if (openId) {
        URL = `${URL}&openId=${openId}`
      }
      const res = await request.get(URL);
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
  async add ({ content, openId }) {
    let data = {};
    try {
      const res = await request.post('/todos/add', {
        openId,
        content
      })
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
  async del (id) {
    let data = {};
    try {
      const res = await request.get(`/todos/del/${id}`)
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
  async edit (id, { openId, content }) {
    let data = {};
    try {
      const res = await request.post('/todos/edit', {
        id,
        openId,
        content
      })
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
  async view (id) {
    let data = {};
    try {
      const res = await request.get(`/todos/view/${id}`)
      data = res.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  },
}
