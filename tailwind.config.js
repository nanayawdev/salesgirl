/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'phone': '320px',
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      colors: {
        algaeGreen: {
          '50': '#edfcf4',
          '100': '#d2f9e2', 
          '200': '#aaf0ca',
          '300': '#72e3ad',
          '400': '#39ce8c',
          '500': '#16b372',
          '600': '#0a915c',
          '700': '#08744c', 
          '800': '#095c3e',
          '900': '#084c34',
          '950': '#032b1e',
        },
        codGray: {
          '50': '#ffffff',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#161616',
        },
        background: {
          light: '#fcfcfc',
          dark: '#131313',
        },
      },
      fontSize: {
        'xs': '12px',     
        'sm': '14px',     
        'base': '16px',   
        'lg': '18px',     
        'xl': '24px',     
        '2xl': '36px',
        '3xl': '48px',
        '4xl': '72px',    
      }
    },
  },
  plugins: [],
}

