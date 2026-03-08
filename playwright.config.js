// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

const config = ({
  testDir: './tests',
  timeout: 40*1000,
  expect: {
    timeout: 80*1000
  },

  use: {
   browserName: 'webkit', //firefox, webkit for safari
   headless: true
  },

 
});

module.exports = config;
