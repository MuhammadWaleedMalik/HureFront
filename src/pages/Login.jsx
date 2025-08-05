import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from '../../styles/colors.module.scss';
import axios from "axios";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const APIURL=import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Check for hardcoded admin credentials
    if (email === "loguote@gmail.com" && password === "12345") {
      setIsLoading(false);
      navigate("/admin");
      return;
    }

    try {
      // Call the login API endpoint
      const response = await axios.post(`${APIURL}/api/user/login`, {
        email,
        password
      });

      if (response.data.success) {
        // Extract user data and token from response
        console.log(response.data);
        const { token, user } = response.data;
        
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
      } else {
        setError(response.data.message || t("loginFailed"));
      }
    } catch (err) {
      // Handle different error cases
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(err.response.data.message || t("loginFailed"));
      } else if (err.request) {
        // The request was made but no response was received
        setError(t("networkError"));
      } else {
        // Something happened in setting up the request
        setError(t("loginFailed"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex flex-col justify-center items-center px-8 sm:px-20 py-12"
      style={{ backgroundColor: styles.primaryColor3 }}
    >
      {/* Login Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-bold mb-10 uppercase"
        style={{ 
          color: styles.primaryColor1,
          fontFamily: styles.headingFont
        }}
      >
        {t("login")}
      </motion.h1>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 10, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
          className="px-6 py-3 rounded-lg mb-6 text-lg shadow-md"
          style={{ 
            backgroundColor: `${styles.primaryColor1}30`,
            color: styles.primaryColor5
          }}
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <motion.form 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit} 
        className="space-y-6 w-full max-w-lg"
      >
        {/* Input Fields */}
        {[
          { label: t("emailAddress"), value: email, setter: setEmail, type: "email" },
          { label: t("password"), value: password, setter: setPassword, type: "password" },
        ].map(({ label, value, setter, type }, index) => (
          <motion.div 
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col"
          >
            <label 
              className="text-xl sm:text-2xl font-semibold mb-2"
              style={{ 
                color: styles.primaryColor1,
                fontFamily: styles.subheadingFont
              }}
            >
              {label}
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full p-3 sm:p-4 border-b-2 bg-transparent text-lg focus:outline-none"
              style={{ 
                borderColor: styles.primaryColor5,
                color: styles.primaryColor5,
                fontFamily: styles.subheadingFont
              }}
              required
            />
          </motion.div>
        ))}

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          type="submit"
          disabled={isLoading}
          className="mt-8 p-4 font-bold text-lg rounded-lg w-full"
          style={{ 
            backgroundColor: styles.primaryColor1,
            color: styles.primaryColor3,
            fontFamily: styles.headingFont
          }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t("loggingIn")}
            </span>
          ) : (
            t("login")
          )}
        </motion.button>
      </motion.form>

      {/* Don't have an account? */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="text-base sm:text-lg mt-8 text-center"
        style={{ 
          color: styles.primaryColor5,
          fontFamily: styles.subheadingFont
        }}
      >
        {t("dontHaveAccount")}{" "}
        <Link 
          to="/signup" 
          className="font-semibold hover:underline"
          style={{ 
            color: styles.primaryColor1,
            fontFamily: styles.subheadingFont
          }}
        >
          {t("signup")}
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default Login;