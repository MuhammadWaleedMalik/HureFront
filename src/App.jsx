import { Routes, Route,Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Aboutus from './pages/Aboutus';
import ProtectedRoute from './components/ProtectedRoute';
import Cookie from './components/Cookie';
import HUREHire from './components/Hire';
import HUREEvents from './components/Events';
import ContactPage from './pages/ContactPage';
import FAQs from './pages/FAQs';
import HUREConnect from './components/Connect';
import DemoRequestPage from './components/RequestDemo';
import UserDashboard from './pages/UsersDashboard';
import ClinicDashboard from './pages/ClinicDashboard';
import Core from './components/Core';

// Admin components
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/ContentManagement';
import UserManagement from './pages/UserManagement';
import BlogManagement from './pages/BlogManagement';
import Notifications from './components/Notifications';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="glass-effect shadow-lg border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet /> {/* This will render the nested admin routes */}
        </main>
      </div>
      <Notifications notifications={[]} onRemove={() => {}} />
    </div>
  );
}

function App() {
  return (  
    <Routes>
      {/* Main website routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="cookies" element={<Cookie />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="hire" element={<HUREHire />} />
        <Route path="event" element={<HUREEvents />} />
        <Route path="connect" element={<HUREConnect />} />
        <Route path="requestdemo" element={<DemoRequestPage />} />
        <Route path="core" element={<Core />} />
        <Route path="userdashboard" element={<UserDashboard />} />
        <Route path="clinicdashboard" element={<ClinicDashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="aboutus" element={<Aboutus />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin routes - using a different layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="blog" element={<BlogManagement />} />
      </Route>
    </Routes>
  );
}

export default App;