'use client';

/* * */

import { useTranslations } from 'next-intl';
import { DatePickerInput } from '@mantine/dates';
import { useFrontendDemandDateLineStopContext } from '@/contexts/FrontendDemandDateLineStopContext';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

/* * */

export default function FrontendDemandDateLineStopViewOneDatePicker() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendDemandDateLineStopViewOneDatePicker');
  const frontendDemandDateLineStopContext = useFrontendDemandDateLineStopContext();
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);

  //
  // B. Render components

  const handleSelectDate = (date) => {
    frontendDemandDateLineStopContext.selectDate(date);
  };

  const handleToogleTimelineAnimation = () => {
    setIsPlayingTimeline((prev) => !prev);
  };

  //
  // C. Render components

  useEffect(() => {
    if (!isPlayingTimeline || !frontendDemandDateLineStopContext.views.date) return;
    const interval = setInterval(() => {
      const currentDatePlusOneDay = new Date(frontendDemandDateLineStopContext.views.date);
      currentDatePlusOneDay.setDate(currentDatePlusOneDay.getDate() + 1);
      frontendDemandDateLineStopContext.selectDate(currentDatePlusOneDay);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [frontendDemandDateLineStopContext, isPlayingTimeline]);

  //
  // C. Render components

  return (
    <DatePickerInput
      aria-label={t('date_picker.label')}
      placeholder={t('date_picker.placeholder')}
      value={frontendDemandDateLineStopContext.views.date}
      onChange={handleSelectDate}
      clearable
      dropdownType="modal"
      size="lg"
      rightSection={
        isPlayingTimeline ? (
          <Tooltip label={t('toggle_timeline_animation.pause.tooltip.label')}>
            <ActionIcon onClick={handleToogleTimelineAnimation} variant="light" color="gray">
              <IconPlayerPause size={20} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label={t('toggle_timeline_animation.play.tooltip.label')}>
            <ActionIcon onClick={handleToogleTimelineAnimation} variant="light" color="gray">
              <IconPlayerPlay size={20} />
            </ActionIcon>
          </Tooltip>
        )
      }
    />
  );

  //
}
