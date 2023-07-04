import { Tooltip } from '@mantine/core';
import styles from './EquipmentIcon.module.css';
import equipments from './equipments';
import { useTranslations } from 'next-intl';

export default function EquipmentIcon({ name }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('equipments');

  //
  // D. Render components

  const EquipmentContainer = ({ innerRef }) => (
    <div ref={innerRef} className={styles.container}>
      {equipments[name].svg}
    </div>
  );

  return (
    equipments[name] && (
      <Tooltip refProp='innerRef' label={t(name)} color='gray' position='bottom' withArrow arrowPosition='center'>
        <EquipmentContainer color='orange' />
      </Tooltip>
    )
  );
}
