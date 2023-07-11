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
    //
    setIsLoading(true);

    let fetchUrl = '';

    if (line_code.startsWith('3') || line_code.startsWith('4')) {
      fetchUrl = `https://api.carrismetropolitana.pt/pdf/${stop_code}/${line_code}/${direction}`;
    } else {
      fetchUrl = `https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/horarios/${line_code}/Linha_${line_code}_${stop_code}.pdf`;
    }

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        else return res.arrayBuffer();
      })
      .then((arrayBuffer) => {
        const fileBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
        const fileBlobUrl = URL.createObjectURL(fileBlob);
        setPdfFileUrl(fileBlobUrl);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        return null;
      });
  }, [direction, line_code, stop_code]);

  //
  // C. Render components

  return isLoading ? (
    <Loader size={27} visible />
  ) : pdfFileUrl ? (
    <a className={styles.container} target='_blank' href={pdfFileUrl}>
      <p>Abrir PDF</p>
      <IconFileDownload size={18} />
    </a>
  ) : (
    <></>
  );

  //
}
