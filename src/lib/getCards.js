import axios from 'axios'

export const getCards = async () => {
  const { data } = await axios.get('http://localhost:3000/cards')
  return data
}
