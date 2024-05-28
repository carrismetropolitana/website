/* * */

import { useFrontendPipContext } from '@/contexts/FrontendPipContext'

import styles from './FrontendPipSurveyAnswer.module.css'

/* * */

export default function FrontendPipSurveyAnswer({ code, description, title }) {
  //

  //
  // A. Setup variables

  const frontendPipContext = useFrontendPipContext();

  //
  // B. Handle actions

  const handleSelectAnswer = () => {
    frontendPipContext.selectAnswer(code);
  };

  //
  // C. Render components

  return (
    <div className={styles.container} onClick={handleSelectAnswer}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  )

  //
}
