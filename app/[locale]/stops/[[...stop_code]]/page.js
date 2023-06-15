'use client';

import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import StopTimetable from '@/components/StopTimetable/StopTimetable';
import StopInfo from '@/components/StopInfo/StopInfo';

export default function Page({ params }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('stops');

  //
  // D. Handle actions

  //
  // E. Render components

  return (
    params.stop_code && (
      <>
        <Divider />
        <StopInfo stopCode={params.stop_code} />
        <Divider />
        <StopTimetable stopCode={params.stop_code} selectedDate={'20230607'} />
      </>
    )
  );
}
