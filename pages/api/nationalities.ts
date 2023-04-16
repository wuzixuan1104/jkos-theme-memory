// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getNationalitiesApi } from '@/api/getNationalitiesApi'

const requests = []

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) {
  // cache every request
  requests.push(req)

  const { body } = req
  const resolveBody = JSON.parse(body)
  const { requestId } = resolveBody

  try {
    getNationalitiesApi(resolveBody).then(response => {
      res.status(200).json(response)
    }).catch(e => { throw e })
  } catch(e) {
    res.status(400).json({ requestId, response: {} })
  }

}
