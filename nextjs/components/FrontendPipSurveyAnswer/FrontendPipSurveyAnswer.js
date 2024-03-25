/* * */

import { useFrontendPipContext } from '@/contexts/FrontendPipContext';
import styles from './FrontendPipSurveyAnswer.module.css';

/* * */

export default function FrontendPipSurveyAnswer({ code, title, description }) {
  //

  //
  // A. Setup variables

  const frontendPipContext = useFrontendPipContext();

  //
  // B. Render components

  const handleSelectAnswer = () => {
    frontendPipContext.selectAnswer(code);
  };

  //
  // B. Render components

  return (
    <div className={`${styles.container} ${frontendPipContext.survey.selected_answer_code === code && styles.selected}`} onClick={handleSelectAnswer}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );

  //
}
