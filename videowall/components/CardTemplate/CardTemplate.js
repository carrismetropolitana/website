/* * */

import Loader from '@/components/Loader/Loader';
import LabelDateRelative from '@/components/LabelDateRelative/LabelDateRelative';
import LabelDateFromTo from '@/components/LabelDateFromTo/LabelDateFromTo';
import styles from './CardTemplate.module.css';

/* * */

export default function CardTemplate({ title = '', isLoading = false, isValidating = false, timestamp = '', startDate = '', endDate = '', children }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div>{isLoading || isValidating ? <Loader size={18} visible /> : <LabelDateRelative date={timestamp} />}</div>
      </div>
      {children}
      <LabelDateFromTo startDate={startDate} endDate={endDate} />
    </div>
  );
}
