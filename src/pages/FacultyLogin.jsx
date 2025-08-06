import WelcomeSection from "../components/faculty/WelcomeSection";
import LoginForm from "../components/faculty/LoginForm";
import PageFooter from "../components/faculty/PageFooter";

const FacultyLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Welcome & Campus Info */}
          <WelcomeSection />

          {/* Right Column - Login Form */}
          <LoginForm />
        </div>

        {/* Footer */}
        <PageFooter />
      </div>
    </div>
  );
};

export default FacultyLogin;