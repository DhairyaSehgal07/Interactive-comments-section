/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     
    extend: {
        colors: {
        'Moderate_Blue':'var(--Moderate_Blue)',
        'Soft_Red':'var(--Soft_Red)',
        'Light_Grayish_Blue':'var(--Light_Grayish_Blue)',
        'Pale_Red':'var(--Pale_Red)',
        
        'Dark_Blue':'var(--Dark_Blue)',
        'Grayish_Blue':'var(--Grayish_Blue)',
        'Light_Gray':'var(--Light_Gray)',
        'Very_Light_Gray':'var(--Very_Light_Gray)',
        'White':'var(--White)',

      },
    },
  },
  plugins: [],
}