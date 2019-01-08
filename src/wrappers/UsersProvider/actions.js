import Axios from "axios";

export const fetchUsers = async () => {
  const response = await Axios.get('https://randomuser.me/api/?results=50')
  console.log(response.data.results)

  return response.data.results
}

export const updateUsers = async (dispatch) => {
  const userProfiles = await fetchUsers()
  
  dispatch({
    type: 'UPDATE_USERS',
    payload: userProfiles
  })
}