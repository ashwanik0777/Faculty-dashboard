import { GraduationCap } from "lucide-react";
import CampusIllustration from "./CampusIllustration";
import RotatingQuotes from "./RotatingQuotes";

const WelcomeSection = () => {
  return (
    <div className="space-y-8 p-10">
      <div className="text-left">
        <div className="flex items-center justify-start mb-6">
          <GraduationCap className="h-16 w-16 text-blue-600 mr-4" />
          <div>
            <h1 className="text-4xl font-bold text-blue-900">MyGBU Smart Campus</h1>
            <p className="text-xl text-blue-700">Faculty Portal</p>
          </div>
        </div>
        
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome Back, Faculty!
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Access your teaching dashboard, manage courses, track student progress, 
          and collaborate with the academic community at Gautam Buddha University.
        </p>
      </div>

      <CampusIllustration />
      <RotatingQuotes />
    </div>
  );
};

export default WelcomeSection;