import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
