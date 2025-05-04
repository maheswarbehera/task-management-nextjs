// lib/useNotifyService.ts
"use client";

import { useSnackbar } from "notistack";

export const useNotifyService = () => {
  const { enqueueSnackbar } = useSnackbar();

  const duration = 3000;

  const getStyle = (variant) => {
    switch (variant) {
      case "success": return { backgroundColor: "#4CAF50", color: "white" };
      case "error": return { backgroundColor: "#F44336", color: "white" };
      case "warning": return { backgroundColor: "#FF9800", color: "white" };
      case "info": return { backgroundColor: "#2196F3", color: "white" };
      default: return {};
    }
  };

  return {
    success: (message, title = "") =>
      enqueueSnackbar(`${title ? title + ": " : ""}${message}`, {
        variant: "success",
        autoHideDuration: duration,
        style: getStyle("success"),
      }),
    error: (message, title = "") =>
      enqueueSnackbar(`${title ? title + ": " : ""}${message}`, {
        variant: "error",
        autoHideDuration: duration,
        style: getStyle("error"),
      }),
    info: (message, title = "") =>
      enqueueSnackbar(`${title ? title + ": " : ""}${message}`, {
        variant: "info",
        autoHideDuration: duration,
        style: getStyle("info"),
      }),
    warning: (message, title = "") =>
      enqueueSnackbar(`${title ? title + ": " : ""}${message}`, {
        variant: "warning",
        autoHideDuration: duration,
        style: getStyle("warning"),
      }),
  };
};
