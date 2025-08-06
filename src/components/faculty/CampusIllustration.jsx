
import { User, BookOpen, GraduationCap } from "lucide-react";

const CampusIllustration = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-8 text-center">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">Smart Campus</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
              <User className="h-6 w-6 text-white" />
            </div>
            <span className="text-gray-700">Faculty Portal</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-gray-700">Course Management</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-gray-700">Research Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusIllustration;
