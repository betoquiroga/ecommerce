import axios from "axios"
import { useState, useEffect } from "react"
import { API_URL } from "../constants/env"

const useFetch = (endpoint, headers = {}) => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_URL}/${endpoint}`, headers)
      .then((resp) => {
        setData(resp.data.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { data, error, loading }
}

export default useFetch
