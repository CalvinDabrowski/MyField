export default function PipelineLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Pipeline Container */}
      <div className="relative">
        {/* Main Pipeline */}
        <div className="w-64 h-6 bg-gray-200 border-2 border-nexfield-slate rounded-full relative overflow-hidden">
          {/* Animated Liquid */}
          <div className="h-full bg-gradient-to-r from-nexfield-emerald to-nexfield-sky animate-pipeline-fill rounded-full"></div>

          {/* Pipeline Segments */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r border-nexfield-slate/30"></div>
            <div className="flex-1 border-r border-nexfield-slate/30"></div>
            <div className="flex-1 border-r border-nexfield-slate/30"></div>
            <div className="flex-1"></div>
          </div>

          {/* Pipeline Ends */}
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-nexfield-slate rounded-l-lg"></div>
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-nexfield-slate rounded-r-lg"></div>
        </div>

        {/* Pipeline Supports */}
        <div className="absolute -bottom-2 left-8 w-2 h-4 bg-nexfield-slate"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-nexfield-slate"></div>
        <div className="absolute -bottom-2 right-8 w-2 h-4 bg-nexfield-slate"></div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p className="text-nexfield-slate font-medium">{text}</p>
        <div className="flex space-x-1 justify-center mt-2">
          <div className="w-2 h-2 bg-nexfield-emerald rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-nexfield-sky rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-nexfield-emerald rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
