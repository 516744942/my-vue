import axios from 'axios';
// export function getCourse() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         { name: 'web全站' },
//         { name: 'web高级' },
//       ])
//     }, 1000);
//   })
// }
export function getCourse() {
  return axios.get('/api/courses').then(res => res.data
  )
}