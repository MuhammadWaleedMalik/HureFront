import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import styles from '../../styles/colors.module.scss';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    designation: "",
    description: "",
    address: "",
    phone: "",
    skills: "",
    role: "user"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError(t("passwordMismatch"));
    }

    setIsLoading(true);

    try {
      // Prepare skills array from comma-separated string
      const userData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      };
      delete userData.confirmPassword;

      const response = await axios.post('http://localhost:4000/api/user/register', userData);
      
      if (response.data.success) {
        console.log(response)
      
        navigate("/login");
      } else {
        setError(response.data.message || t("signupFailed"));
      }
    } catch (err) {
      setError(err.response?.data?.message || t("signupFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full py-12 flex mt-24 flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: styles.primaryColor3 }}
    >
      {/* Sign Up Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center"
      >
        <h1
          className="text-4xl sm:text-5xl font-bold mb-6 uppercase"
          style={{ 
            color: styles.primaryColor1,
            fontFamily: styles.headingFont
          }}
        >
          {t("signup")}
        </h1>
        <p 
          className="text-lg"
          style={{
            color: styles.primaryColor5,
            fontFamily: styles.subheadingFont
          }}
        >
          {t("createYourAccount")}
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-2xl px-6 py-3 rounded-lg mb-6 text-lg shadow-md"
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
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl space-y-4 bg-white p-8 rounded-xl shadow-lg"
        style={{ backgroundColor: `${styles.primaryColor3}90` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Fields */}
          {[
            { label: t("name"), name: "name", type: "text", required: true },
            { label: t("emailAddress"), name: "email", type: "email", required: true },
            { label: t("password"), name: "password", type: "password", required: true },
            { label: t("confirmPassword"), name: "confirmPassword", type: "password", required: true },
          ].map((field, index) => (
            <motion.div 
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col"
            >
              <label 
                className="text-lg font-medium mb-1"
                style={{ 
                  color: styles.primaryColor1,
                  fontFamily: styles.subheadingFont
                }}
              >
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: styles.primaryColor5,
                  color: styles.primaryColor5,
                  fontFamily: styles.subheadingFont,
                  backgroundColor: styles.primaryColor3
                }}
                required={field.required}
              />
            </motion.div>
          ))}

          {/* Optional Fields */}
          {[
            { label: t("designation"), name: "designation", type: "text" },
            { label: t("phone"), name: "phone", type: "tel" },
            { label: t("address"), name: "address", type: "text" },
            { label: t("skills"), name: "skills", type: "text", placeholder: t("commaSeparated") },
          ].map((field, index) => (
            <motion.div 
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: (index + 4) * 0.1 }}
              className="flex flex-col"
            >
              <label 
                className="text-lg font-medium mb-1"
                style={{ 
                  color: styles.primaryColor1,
                  fontFamily: styles.subheadingFont
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: styles.primaryColor5,
                  color: styles.primaryColor5,
                  fontFamily: styles.subheadingFont,
                  backgroundColor: styles.primaryColor3
                }}
                placeholder={field.placeholder || ""}
              />
            </motion.div>
          ))}

          {/* Role Selection */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col"
          >
            <label 
              className="text-lg font-medium mb-1"
              style={{ 
                color: styles.primaryColor1,
                fontFamily: styles.subheadingFont
              }}
            >
              {t("role")}
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: styles.primaryColor5,
                color: styles.primaryColor5,
                fontFamily: styles.subheadingFont,
                backgroundColor: styles.primaryColor3
              }}
            >
              <option value="user">{t("user")}</option>
              <option value="Clinic">{t("clinic")}</option>
            </select>
          </motion.div>

          {/* Description */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:col-span-2"
          >
            <label 
              className="text-lg font-medium mb-1"
              style={{ 
                color: styles.primaryColor1,
                fontFamily: styles.subheadingFont
              }}
            >
              {t("description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: styles.primaryColor5,
                color: styles.primaryColor5,
                fontFamily: styles.subheadingFont,
                backgroundColor: styles.primaryColor3
              }}
            />
          </motion.div>
        </div>

        {/* Sign Up Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg font-bold text-lg transition-all"
            style={{ 
              backgroundColor: isLoading ? styles.primaryColor5 : styles.primaryColor1,
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
                {t("creatingAccount")}
              </span>
            ) : (
              t("createAccount")
            )}
          </motion.button>
        </motion.div>
      </motion.form>

      {/* Already have an account? */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-2xl text-center mt-6"
      >
        <p
          className="text-lg"
          style={{ 
            color: styles.primaryColor5,
            fontFamily: styles.subheadingFont
          }}
        >
          {t("alreadyHaveAccount")}{" "}
          <Link 
            to="/login" 
            className="font-semibold hover:underline"
            style={{ 
              color: styles.primaryColor1,
              fontFamily: styles.subheadingFont
            }}
          >
            {t("login")}
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;