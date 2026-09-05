// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

const config = ({
  testDir: './tests',
  timeout: 40*1000,
  expect: {
    timeout: 80*1000
  },

  reporter:'html',

  use: {
   browserName: 'webkit', //firefox, webkit for safari
   headless: false,
   screeshot: 'on',
   trace: 'retain-on-failure' 
   },
 
});

module.exports = config;
