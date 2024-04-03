"use client"

/* * */

import { Modal, Button, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import styles from './FrontendPlannerVideo.module.css';

/* * */

export default function FrontendPlannerVideo() {
  //

  //
  // A. Setup variables

  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslations("FrontendPlanner");

  console.log(styles)
  //
  // B. Render components

  return (
    <>
      <Modal.Root opened={opened} onClose={close} centered size="calc(100vw - 3rem)" >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header classNames={{header:styles.modalHeader}} >
            <h3>{t('how_to_use')}</h3>
            <ActionIcon variant="subtle" color="white" size="md" aria-label="close" onClick={close}>
              <IconX />
            </ActionIcon>
          </Modal.Header>
          <Modal.Body p={0} className={styles.modalBody}> 
            <iframe src="https://www.youtube-nocookie.com/embed/cckWfHTyDwQ" className={styles.iframe} frameborder="0" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button variant="default" leftSection={<svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} viewBox='0 0 24 24' >
        <path d='M3 22v-20l18 10-18 10z' />
      </svg>}
        onClick={open}>{t('open')}</Button>
    </>
  );

  //
}

