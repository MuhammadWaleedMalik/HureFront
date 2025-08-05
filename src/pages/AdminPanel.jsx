import React, { useState } from "react";

// Placeholder components for each admin section
const SectionHeader = ({ title }) => (
    <h2 style={{ marginTop: "2rem", borderBottom: "1px solid #eee" }}>{title}</h2>
);

const Placeholder = ({ text }) => (
    <div style={{ padding: "1rem", color: "#888" }}>{text}</div>
);

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState("content");

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
            <h1>Admin Panel</h1>
            <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
                <button onClick={() => setActiveTab("content")}>Website Content</button>
                <button onClick={() => setActiveTab("forms")}>Lead/Contact Forms</button>
                <button onClick={() => setActiveTab("seo")}>SEO & Meta</button>
                <button onClick={() => setActiveTab("blog")}>Blog/Resources</button>
                <button onClick={() => setActiveTab("footer")}>Footer & Legal</button>
                <button onClick={() => setActiveTab("users")}>Admin Users</button>
            </nav>

            {activeTab === "content" && (
                <div>
                    <SectionHeader title="Hero Section" />
                    <Placeholder text="Edit hero title, subtitle, and call-to-action buttons. Upload images/videos." />

                    <SectionHeader title="Module Descriptions" />
                    <Placeholder text="Edit modules (Core, Hire, Events, Connect): icons, text, links." />

                    <SectionHeader title="Pricing Plans" />
                    <Placeholder text="Edit pricing plans: titles, features, prices, availability toggles." />

                    <SectionHeader title="Testimonials" />
                    <Placeholder text="Manage testimonials: name, company, image, testimonial text." />

                    <SectionHeader title="About Us" />
                    <Placeholder text="Edit mission statement, team profiles, images." />

                    <SectionHeader title="Blog/News Articles" />
                    <Placeholder text="Manage blog/news articles (if enabled)." />
                </div>
            )}

            {activeTab === "forms" && (
                <div>
                    <SectionHeader title="Form Submissions" />
                    <Placeholder text="View/export all form submissions. Email notification settings." />

                    <SectionHeader title="Form Fields" />
                    <Placeholder text="Edit form fields for contact, demo request, newsletter signup." />
                </div>
            )}

            {activeTab === "seo" && (
                <div>
                    <SectionHeader title="SEO & Meta Settings" />
                    <Placeholder text="Edit SEO titles, meta descriptions, image alt text, and inject custom scripts (Google Analytics, Facebook Pixel)." />
                </div>
            )}

            {activeTab === "blog" && (
                <div>
                    <SectionHeader title="Blog/Resource Management" />
                    <Placeholder text="Create/edit blog posts, manage categories/tags, upload featured images, schedule posts, publish/unpublish." />
                </div>
            )}

            {activeTab === "footer" && (
                <div>
                    <SectionHeader title="Footer & Legal" />
                    <Placeholder text="Edit footer links (Privacy Policy, Terms), social media links, and contact info." />
                </div>
            )}

            {activeTab === "users" && (
                <div>
                    <SectionHeader title="Admin User Management" />
                    <Placeholder text="Manage admin users: Super Admin, Editor/Contributor roles." />
                </div>
            )}
        </div>
    );
};

export default AdminPanel;