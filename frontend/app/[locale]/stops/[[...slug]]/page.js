'use client';

import { useState, useEffect } from 'react';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import StopTimetable from '@/components/StopTimetable/StopTimetable';
import StopInfo from '@/components/StopInfo/StopInfo';

export default function Page({ params }) {
  //

  //
  // A. Setup variables

  const [selectedStopCode, setSelectedStopCode] = useState();
  const t = useTranslations('stops');

  //
  // D. Handle actions

  useEffect(() => {
    if (params && params.slug && params.slug.length) {
      setSelectedStopCode(params.slug[0]);
    }
  }, [params]);

  //
  // E. Render components

  return (
    <>
      <StopInfo stopCode={selectedStopCode} />
      <Divider />
      <StopTimetable stopCode={selectedStopCode} selectedDate={'20230607'} />
    </>
  );
}
