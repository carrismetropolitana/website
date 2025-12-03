"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function Component() {
  // Current height of the iframe. Starts with a safe fallback value.
  const [height, setHeight] = useState(900);
  const lastContentHeight = useRef<number>(900);

  // Register a listener for messages coming from the embedded form.
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check: only accept messages from the official backoffice origin.
      if (event.origin !== "https://backoffice.carrismetropolitana.pt") return;

      const data = event.data as any;
      if (!data || typeof data.height !== "number") return;

      // Extract and validate the data payload.
      const contentHeight = data.height;

      console.log(
        "[Contacts Form] Mensagem recebida:",
        "origin=",
        event.origin,
        "height=",
        contentHeight
      );

      // Discard clearly invalid height values.
      if (contentHeight <= 0 || contentHeight > 5000) return;

      // Do not update If the new height is almost the same as the previous one,
      if (Math.abs(contentHeight - lastContentHeight.current) < 5) {
        return;
      }

      // Store the new height and update the iframe height state.
      lastContentHeight.current = contentHeight;
      setHeight(contentHeight);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Render the contact form iframe with dynamic height and no scrollbars.
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
