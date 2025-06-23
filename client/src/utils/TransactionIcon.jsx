import { Book, Car, CircleEllipsis, Clapperboard, HeartPulse, Home, Utensils, UtilityPole } from "lucide-react";

const TransactionIcon = ({ type }) => {
  const iconClasses = "sm:w-8 sm:h-8 w-10 h-8  mr-0 rounded-full flex items-center justify-center";

  switch (type) {
    case "Housing":
      return (
        <div className={`${iconClasses} bg-gray-200`}>
          <Home size={16} className="text-gray-800" />
        </div>
      );
    case "Food & Dining":
      return (
        <div className={`${iconClasses} bg-gray-200`}>
          <Utensils size={16} className="text-gray-800" />
        </div>
      );
    case "Entertainment":
      return (
        <div className={`${iconClasses} bg-gray-200`}>
          <Clapperboard size={16} className="text-gray-800" />
        </div>
      );
    case "Transport":
      return (
        <div className={`${iconClasses} bg-gray-200`}>
          <Car size={16} className="text-gray-800" />
        </div>
      );
    case "Healthcare":
      return (
        <div className={`${iconClasses} bg-gray-200`}>
          <HeartPulse size={16} className="text-gray-800" />
        </div>
      );
    case "Utilities":
      return (
        <div className={`${iconClasses} bg-gray-200`}>
          <UtilityPole size={16} className="text-gray-800" />
        </div>
      );
    case "Education":
      return (
        <div className={`${iconClasses} bg-gray-200`}>
          <Book size={16} className="text-gray-800" />
        </div>
      );
    default:
      return (
        <div className={`${iconClasses} bg-gray-200`}>
          <CircleEllipsis size={16} className="text-gray-800" />
        </div>
      );
  }
};
export default TransactionIcon;