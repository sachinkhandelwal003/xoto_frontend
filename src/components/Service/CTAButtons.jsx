import React from "react";
import { useTranslation } from "react-i18next";

export default function CTAButtons() {
  const { t, i18n } = useTranslation("mort1");

  const isRTL = i18n.language === "fa";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`flex items-center gap-4 flex-wrap ${
        isRTL ? "justify-end" : "justify-center"
      }`}
    >
      {/* PRIMARY BUTTON */}
      <button
        onClick={() => alert(t("cta.preApprovedAlert"))}
        className="
          px-8 py-3
          bg-[var(--color-primary)]
          text-white
          font-semibold
          rounded-lg
          shadow-md
          transition-all duration-300
        "
      >
        {t("cta.preApproved")}
      </button>

      {/* OUTLINE BUTTON */}
      <button
        onClick={() => alert(t("cta.calculateAlert"))}
        className="
          px-8 py-3
          border-2 border-white/70
          text-white
          font-semibold
          rounded-lg
          backdrop-blur-sm
          transition-all duration-300
          hover:bg-[var(--color-primary)]
          hover:border-[#5C039B]
          hover:shadow-lg
        "
      >
        {t("cta.calculate")}
      </button>
    </div>
  );
}
