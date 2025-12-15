import { useEffect } from "react";

const XobiaChatbot = () => {
  useEffect(() => {
    if (window.customElements?.get("vapi-widget")) return;

    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <vapi-widget
      public-key="e3654022-68a5-478b-8af1-86c19ddaa703"
      assistant-id="2e5fdf84-bb62-4ea7-a620-ae5cb40d264a"
      mode="chat"
      theme="light"
    />
  );
};

export default XobiaChatbot;
