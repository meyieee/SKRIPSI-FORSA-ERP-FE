import {createRoot} from 'react-dom/client'
import {Chart, registerables} from 'chart.js'
import { QueryClientProvider } from "@tanstack/react-query";
// Apps
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider} from './app/modules/auth'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AlertContextProvider } from "./app/components/";
// Date Range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { GeneralReactQuery } from './app/functions/reactQuery'

const Global = createGlobalStyle`
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0%;
  }
`;

Chart.register(...registerables)

const container = document.getElementById('root')
const theme = {
  colors: {
    message_error: "#ff0000",
    message_success: "#00ff00",
  },
};
if (container) {
  createRoot(container).render(
     <ThemeProvider theme={theme}>
       <AlertContextProvider>
         <Global/>
         <QueryClientProvider client={GeneralReactQuery}>
             <AuthProvider>
               <AppRoutes />
             </AuthProvider>
         </QueryClientProvider>
       </AlertContextProvider>
     </ThemeProvider>
  )
}