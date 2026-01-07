import './App.css'
import { Routes, Route } from 'react-router-dom'
import VendorProfilePage from './pages/VendorProfile'
import BookingConfirmation from './pages/BookingConfirmation'
import PaymentSuccess from './pages/PaymentSuccess'
import AnswerQuestionnaire from './pages/AnswerQuestionnaire'
import ApplyedSuccess from './pages/ApplyedSuccess'
import BookingDetails from './pages/BookingDetails'


function App() {

  return (
    <Routes>
      <Route path="/" element={<VendorProfilePage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/booking-details" element={<BookingDetails />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/apply-success" element={<ApplyedSuccess />} />
      <Route path="/questionnarie" element={<AnswerQuestionnaire />} />
    </Routes>
  )
}


export default App
