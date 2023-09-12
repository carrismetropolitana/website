import { useTranslations } from 'next-intl';
import Loader from '@/components/Loader/Loader';
import styles from './Pannel.module.css';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';

export default function Pannel({ loading, error, icon, title, rightSection, children }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('Pannel');

  console.log(rightSection);

  //
  // A. Render components

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeftSection}>
            {icon && <div className={styles.headerIcon}>{icon}</div>}
            {title && <h2 className={styles.headerTitle}>{title}</h2>}
          </div>
          {rightSection && <div className={styles.headerRightSection}>{rightSection}</div>}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.isError}>
            <NoDataLabel text={t('error')} />
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeftSection}>
            {icon && <div className={styles.headerIcon}>{icon}</div>}
            {title && <h2 className={styles.headerTitle}>{title}</h2>}
          </div>
          {rightSection && <div className={styles.headerRightSection}>{rightSection}</div>}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.isLoading}>
            <Loader visible />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeftSection}>
          {icon && <div className={styles.headerIcon}>{icon}</div>}
          {title && <h2 className={styles.headerTitle}>{title}</h2>}
        </div>
        {rightSection && <div className={styles.headerRightSection}>{rightSection}</div>}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
