/* * */

import LiveIcon from '@/components/LiveIcon/LiveIcon'
import { IconArrowNarrowRight } from '@tabler/icons-react'

import styles from './FrontendLinesToolbarPeriodsPeriod.module.css'

/* * */

export default function FrontendLinesToolbarPeriodsPeriod({ periodData }) {
  return (
    <div className={`${styles.container} ${periodData.isActive && styles.isActive}`} key={periodData.id}>
      <h5 className={styles.periodName}>
        {periodData.name}
        {periodData.isActive && <LiveIcon color="#ffffff" />}
      </h5>
      {periodData.validPairs.map((validPair, index) => 
<p key={index} className={styles.validPair}>
				<span className={styles.validPairDate}>{validPair.from}</span> <IconArrowNarrowRight size={15} /> <span className={styles.validPairDate}>{validPair.until}</span>
			</p>


      )}
    </div>
  )
}
