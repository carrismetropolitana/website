/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import Loader from '@/components/Loader/Loader';
import Panel from '@/components/Panel/Panel';

/* * */

export default function Loading() {
  return (
    <OneFullColumn>
      <Panel title="Alertas de Serviço">
        <div style={{ display: 'flex', justifyContent: 'center', padding: 8, width: '100%' }}>
          <Loader visible />
        </div>
      </Panel>
    </OneFullColumn>
  );
}
