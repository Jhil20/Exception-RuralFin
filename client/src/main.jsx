import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import appRouter from './routes/appRouter'
import { Provider } from 'react-redux'
import store from "./redux/store/store";
createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <RouterProvider router={appRouter} />
  </Provider>
)
