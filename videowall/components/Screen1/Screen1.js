/* * */

import Columns from '@/components/Columns/Columns';
import ScreenWrapper from '@/components/ScreenWrapper/ScreenWrapper';
import Screen1PaxSummary from '@/components/Screen1PaxSummary/Screen1PaxSummary';
import Screen1PutSummary from '@/components/Screen1PutSummary/Screen1PutSummary';

/* * */

export default function Screen1() {
  return (
    <ScreenWrapper>
      <Columns cols={1}>
        <Screen1PaxSummary />
        <Screen1PutSummary />
      </Columns>
    </ScreenWrapper>
  );
}