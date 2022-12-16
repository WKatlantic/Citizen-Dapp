// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { BASE_URL } from '../../../src/config/constants'

type Data = {
  success: boolean
  data?: any
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { pid } = req.query
  if (req.method !== 'POST') {
    res.status(404).json({ success: false })
    return
  }
  const reqData = req.body
  try {
    const resData = await axios.post(`${BASE_URL}api/users/${pid}`, reqData)
    if (resData.data.success === true)
      res.status(200).json({ success: true, data: resData.data.data })
    else res.status(200).json({ success: false, error: resData.data.error })
  } catch (err) {
    res.status(200).json({ success: false, error: err })
  }
}
