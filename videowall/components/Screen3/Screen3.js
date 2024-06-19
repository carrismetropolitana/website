/* * */

import Columns from '@/components/Columns/Columns';
import ScreenWrapper from '@/components/ScreenWrapper/ScreenWrapper';
import CardSequentiality from '@/components/CardSequentiality/CardSequentiality';

/* * */

export default function Screen3() {
  return (
    <ScreenWrapper>
      <Columns cols={1}>
        <CardSequentiality title="Sequencialidade A3 (TST)" operatorId={43} />
      </Columns>
    </ScreenWrapper>
  );
}
