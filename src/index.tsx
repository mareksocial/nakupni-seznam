import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'

import './index.css'
import App from './App'

i18n
  .use(initReactI18next)
  .use(LanguageDetector) 
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "cs"],
    lng: document.querySelector('html')?.lang,
    fallbackLng: "en",
    detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
    },
    backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json',
        }
  });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const loadingMarkup = <div className='py-4 text-center'>Loading...</div>
root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Suspense>
)
