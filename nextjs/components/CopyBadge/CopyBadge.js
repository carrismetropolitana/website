import { useClipboard } from '@mantine/hooks'

import styles from './CopyBadge.module.css'

export default function CopyBadge({ label, value }) {
  //

  //
  // A. Setup variables

  const clipboard = useClipboard({ timeout: 600 });

  //
  // D. Render components

  return (
    <div className={styles.container} onClick={() => clipboard.copy(value)}>
      {clipboard.copied ? 'Copied' : label ? label : value}
    </div>
  )
}
