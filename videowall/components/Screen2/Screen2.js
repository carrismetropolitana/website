/* * */

import Columns from '@/components/Columns/Columns';
import ScreenWrapper from '@/components/ScreenWrapper/ScreenWrapper';
import CardSequentiality from '@/components/CardSequentiality/CardSequentiality';

/* * */

export default function Screen1() {
  return (
    <ScreenWrapper>
      <Columns cols={2}>
        <CardSequentiality title="Sequencialidade A1 (VA)" operatorId={41} />
        <CardSequentiality title="Sequencialidade A2 (RL)" operatorId={42} />
      </Columns>
    </ScreenWrapper>
  );
}
