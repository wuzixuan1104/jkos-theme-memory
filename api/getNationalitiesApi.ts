import { nationalitiesOfKeyword, nationalitiesOfPage } from '@/utils/nationalities' 
import { INationalityData, INationalityPageProps } from '@/data/typing'

// const DELAY = 1000;

interface getNationalitiesApiProps {
  page: INationalityPageProps,
  keyword: string
  requestId: string
}

interface getNationalitiesApiResp {
  requestId: string
  response: INationalityData[]
}

export function getNationalitiesApi ({ page, keyword, requestId }: getNationalitiesApiProps): Promise<getNationalitiesApiResp> {
  return new Promise((resolver) => {
    // setTimeout(() => {
      const dataInPage = (source: INationalityData[]) => nationalitiesOfPage(source, page)
      const response = dataInPage(nationalitiesOfKeyword(keyword))
      resolver({
        requestId,
        response
      })
    // }, DELAY)
  })
}