import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import Toast from "./components/Toast";
import YoutubeIcon from "./components/YoutubeIcon";
import TelegramIcon from "./components/TelegramIcon";
import Loader from "./components/Loader";
import ArrowIcon from "./components/ArrowIcon";
import Form from "./components/Form";
import Info from "./components/Info";
import Instructions from "./components/Instructions";
import { FormProvider } from "./context/FormContext";
import { LoaderProvider, useLoader } from "./context/LoaderContext";
import { ToastProvider, ToastContext, useToast } from "./context/ToastContext";

const Popup = () => {
  const { loading } = useLoader();
  const { toast, setToast } = useContext(ToastContext);
  const { showToast } = useToast();

  const handleInfoClick = () => {
    console.log("Show toast");
    showToast(
      "info",
      <p className="ml-4">
        Enter your{" "}
        <span className="mr-0 rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
          BOT TOKEN
        </span>{" "}
        and{" "}
        <span className="mr-1 rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
          CHAT ID
        </span>{" "}
        before pressing send
      </p>
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      {/* Loader overlay */}
      {loading && <Loader />}
      <div className="relative bg-slate-900 px-6 pb-8 pt-10 text-white shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-xs text-white">
          <div className="group flex justify-evenly px-10">
            <YoutubeIcon />
            <ArrowIcon />
            <TelegramIcon />
          </div>
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-4 leading-7 text-white">
              <Instructions />
              {/* Toast appears here */}
              {toast && (
                <Toast type={toast.type} onClose={() => setToast(null)}>
                  {toast.message}
                </Toast>
              )}
              <Form />
              <Info onClick={handleInfoClick} label="Info" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("react-target");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <LoaderProvider>
      <ToastProvider>
        <FormProvider>
          <Popup />
        </FormProvider>
      </ToastProvider>
    </LoaderProvider>
  </React.StrictMode>
);
