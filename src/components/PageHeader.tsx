interface PageHeaderProps {
  title: string;
  description: string;
  backgroundClass?: string;
  showLogo?: boolean;
}

const PageHeader = ({ title, description, backgroundClass = "bg-gradient-to-br from-slate-50 to-white", showLogo = false }: PageHeaderProps) => {
  return (
    <div className={`pt-28 pb-16 ${backgroundClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {showLogo && (
          <div className="flex justify-center mb-8">
            <img 
              src="/bpi.jpeg" 
              alt="Bitcoin Policy Institute India" 
              className="h-24 w-36 object-cover rounded-2xl shadow-lg border-2 border-orange-200"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-inter">
          {title}
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-lora">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
