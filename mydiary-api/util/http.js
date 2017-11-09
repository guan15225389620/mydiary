// import axios from 'axios'
// axios.defaults.timeout = 5000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
// axios.interceptors.response.use(res => {
//     console.log(res.data)
//     if (res.data && res.data.code === 11) {
//         alert('登录失效')
//         router.push('/login')
//         return
//     }
//     return res
// }, function (error) {
//     return Promise.reject(error)
// })
// export default {
//     fetchGet(url, params = {}) {
//         return new Promise((resolve, reject) => {
//             axios.get(url, params).then(res => {
//                 resolve(res.data)
//             }).catch(error => {
//                 reject(error)
//             })
//         })
//     },
//     fetchPost(url, params = {}) {
//         return new Promise((resolve, reject) => {
//             axios.post(url, params).then(res => {
//                 resolve(res.data)
//             }).catch(error => {
//                 reject(error)
//             })
//         })
//     }
// }
