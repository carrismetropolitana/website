'use client';

import Block from '@/components/Block/Block';
import { OneFullColumn } from '@/components/Layouts/Layouts';
import useSWR from 'swr';

export default function Page() {
  //

  //
  // A. Setup variables

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://schedules.carrismetropolitana.pt/api/stops');

  //
  // E. Render components

  return (
    <OneFullColumn
      first={
        <Block title='Consulta de Paragens' loading={allStopsLoading} error={allStopsError}>
          <p>some statistics will be on this page</p>
        </Block>
      }
    />
  );
}
