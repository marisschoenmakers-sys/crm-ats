import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import LoginGate from './components/LoginGate'
import './App.css'

function App() {
  return (
    <LoginGate>
      <RouterProvider router={router} />
    </LoginGate>
  )
}

export default App
