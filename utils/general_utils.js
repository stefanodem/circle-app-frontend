// import { setting1, setting2, setting3 } from 'config/constants'

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
