import axios from 'axios'

const API_URL = `https://randomuser.me/api/`

export const fetchUsersApi = async (page: number, results: number = 10) => {
  const { data } = await axios.get(API_URL, {
    params: {
      page,
      results,
    },
  })

  return data.results
}
