import * as React from 'react';
import { createApp } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';
import authService from '@/services/auth';

const locale = getLocale();
const appConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => <LocaleProvider locale={locale}>{children}</LocaleProvider>,
    getInitialData: async () => {
      const roles = await authService.getRoles();
      return {
        auth: {
          roles
        }
      }
    }
  },
  request: {
    baseURL: '/api',
    interceptors: {
      response: {
        onError: (error) => {
          console.error('global response error');
          return Promise.reject(error);
        }
      }
    }
  }
};

createApp(appConfig);
