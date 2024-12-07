import { getAnalytics } from '@/app/api/api_url'
import React from 'react'
import Renderanalytics from './renderanalytics';

async function Wrapper() {
  const data = await getAnalytics();
  console.log(data);
  return (
    <Renderanalytics data={data.dailyPerformance} />
  )
}

export default Wrapper