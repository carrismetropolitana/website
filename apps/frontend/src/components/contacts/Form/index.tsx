"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function Component() {
  const [height, setHeight] = useState(900); // fallback inicial
  const lastContentHeight = useRef<number>(900);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // segurança: só aceita mensagens do backoffice
      if (event.origin !== "https://backoffice.carrismetropolitana.pt") return;

      const data = event.data as any;
      if (!data || typeof data.height !== "number") return;

      const contentHeight = data.height;

      console.log(
        "[Contacts Form] Mensagem recebida:",
        "origin=",
        event.origin,
        "height=",
        contentHeight
      );

      // descarta valores absurdos
      if (contentHeight <= 0 || contentHeight > 5000) return;

      // se praticamente não mudou, não atualiza
      if (Math.abs(contentHeight - lastContentHeight.current) < 5) {
        return;
      }

      lastContentHeight.current = contentHeight;
      setHeight(contentHeight); // sem +20 aqui!
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      className={styles.iframe}
      src="https://backoffice.carrismetropolitana.pt/formulario-embed-2/"
      title="Formulário de contacto"
      style={{ height: `${height}px` }}
      scrolling="no"
    />
  );
}
