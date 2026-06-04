import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { AdminRoute } from './components/ProtectedRoute.jsx'
import AdminPage from './pages/admin/AdminPage.jsx'
import Header from './components/Header.jsx'
import HeroSlider from './components/HeroSlider.jsx'
import PlansSection from './components/PlansSection.jsx'
import ExperienceSection from './components/ExperienceSection.jsx'
import ClassesSection from './components/ClassesSection.jsx'
import AppSection from './components/AppSection.jsx'
import AddonsSection from './components/AddonsSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'

function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSlider />
      <PlansSection />
      <ExperienceSection />
      <ClassesSection />
      <AppSection />
      <AddonsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/*" element={
            <AdminRoute><AdminPage /></AdminRoute>
          } />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
