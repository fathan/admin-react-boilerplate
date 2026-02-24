interface ProgressTooltipProps {
  content: string;
}

const ProgressTooltip: React.FC<ProgressTooltipProps> = ({ content }) => {
  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 
      bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md
      whitespace-nowrap">
      {content}
    </div>
  );
};

export default ProgressTooltip;