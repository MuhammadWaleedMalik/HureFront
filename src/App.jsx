import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from  './pages/NotFound';
import Pricing from  './pages/Pricing';
import Privacy from   './pages/Privacy';
import Terms from     './pages/Terms';
import Aboutus from   './pages/Aboutus';






import ProtectedRoute from './components/ProtectedRoute';




// import Gallery from './pages/Gallery';


import Cookie from './components/Cookie';

import HUREHire from './components/Hire';
import HUREEvents from './components/Events';

import ContactPage from './pages/ContactPage';


// import ProjectExplorer from './pages/Explore';


import FAQs from './pages/FAQs';
import HUREConnect from './components/Connect';
import DemoRequestPage from './components/RequestDemo';
import UserDashboard from './pages/UsersDashboard';
import ClinicDashboard from './pages/ClinicDashboard';
import Core from './components/Core';








function App() {
  return (  
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        
        <Route path="cookies" element={<Cookie />} />
        {/* <Route path="explore" element={<ProjectExplorer />} /> */}
        <Route path="contact" element={<ContactPage />} />
        <Route path="faqs" element={<FAQs   />} />
        
        <Route path="hire" element={<HUREHire  />} />
        <Route path="event" element={<HUREEvents  />} />
        <Route path="connect" element={<HUREConnect />} />
        
        <Route path="requestdemo" element={<DemoRequestPage />} />
       
        <Route path="core" element={<Core />} />


        <Route path="userdashboard" element={<UserDashboard />} /> 
         <Route path="clinicdashboard" element={<ClinicDashboard />}/> 



        
        
      
          
     
          
          


        
        
          
        {/* <Route element={<ProtectedRoute />}>
        </Route> */}
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="privacy" element={<Privacy/>} />
        <Route path="terms" element={<Terms/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        <Route path="pricing" element={<Pricing/>} />
        
        
        <Route path="*" element={<NotFound />} />
      
      
      


      </Route>
    </Routes>
  );
}

export default App;