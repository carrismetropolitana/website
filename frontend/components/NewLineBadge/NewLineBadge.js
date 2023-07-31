import useSWR from 'swr';
import Loader from '../Loader/Loader';
import styles from './NewLineBadge.module.css';

export function NewLineBadge({ code }) {
  //

  //
  // B. Fetch data

  const { data: lineData, isLoading: lineLoading } = useSWR(code && `https://api.carrismetropolitana.pt/lines/${code}`);

  //
  // D. Render components

  return (
    <div>
      {lineLoading && <Loader visible />}
      {lineData && (
        <div className={styles.badge} style={{ backgroundColor: lineData.color, color: lineData.text_color }}>
          {lineData.short_name || '• • •'}
        </div>
      )}
    </div>
  );
}
