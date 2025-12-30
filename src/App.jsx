import './App.css'
import { Routes, Route } from 'react-router-dom'
import VendorProfilePage from './pages/VendorProfile'
import BookingConfirmation from './pages/BookingConfirmation'
import PaymentSuccess from './pages/PaymentSuccess'
import AnswerQuestionnaire from './pages/AnswerQuestionnaire'


function App() {

  return (
    <Routes>
      <Route path="/" element={<VendorProfilePage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/questionnarie" element={<AnswerQuestionnaire />} />
    </Routes>
  )
}


export default App
