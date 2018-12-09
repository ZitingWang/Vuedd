import Api from '@/services/api'

export default {
  fetchPosts () {
    return Api().get('/Post')
  },
  postPost (post) {
    return Api().post('/Post', post,
      { headers: {'Content-type': 'application/json'} })
  },
  likePost (writer) {
    return Api().put(`/Post/${writer}/uplike`)
  },
  deletePost (writer) {
    return Api().delete(`/Post/${writer}`)
  },
  fetchPost (id) {
    return Api().get(`/Post/${id}`)
  },
  putPost (id, post) {
    console.log('REQUESTING ' + post._id + ' ' +
      JSON.stringify(post, null, 5))
    return Api().put(`/Post/${id}`, post,
      { headers: {'Content-type': 'application/json'} })
  }
}
