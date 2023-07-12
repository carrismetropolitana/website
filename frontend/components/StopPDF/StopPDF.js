import { useEffect, useState } from 'react';
import styles from './StopPDF.module.css';
import { IconFileDownload } from '@tabler/icons-react';
import Loader from '../Loader/Loader';

export default function StopPDF({ line_code, stop_code, direction }) {
  //

  //
  // C. Handle actions

  const [isLoading, setIsLoading] = useState(true);
  const [pdfFileUrl, setPdfFileUrl] = useState('');

  //
  // C. Handle actions

  useEffect(() => {
    (async function () {
      try {
        //
        let fetchUrl = '';
        if (line_code.startsWith('3') || line_code.startsWith('4')) {
          fetchUrl = `https://api.carrismetropolitana.pt/pdf/${stop_code}/${line_code}/${direction}`;
        } else {
          fetchUrl = `https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/horarios/${line_code}/Linha_${line_code}_${stop_code}.pdf`;
        }

        const response = await fetch(fetchUrl);
        const responseData = await response.arrayBuffer();

        const fileBlob = new Blob([responseData], { type: 'application/pdf' });
        const fileBlobUrl = URL.createObjectURL(fileBlob);
        setPdfFileUrl(fileBlobUrl);
        //
      } catch (error) {
        return null;
      }
    })();
  }, [direction, line_code, stop_code]);

  //
  // C. Render components

  return pdfFileUrl ? (
    <a className={styles.container} target='_blank' href={pdfFileUrl}>
      <p>Abrir PDF</p>
      <IconFileDownload size={18} />
    </a>
  ) : (
    <></>
  );

  //
}
