export default function PackageCard({
  logo,
  title,
  ageGroup,
  description,
  sessions,
  price,
  onSelect,
}) {
  return (
    <div className="bg-gray-50 border border-[#F49C7A] rounded-2xl p-4 shadow-lg w-full sm:p-5 md:p-6 lg:p-7">

      {/* Title Row */}
      <div className="flex items-center space-x-3 mb-3">
        <img src={logo} alt="logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" />
        <h3 className="text-base md:text-lg font-bold text-[#510f30]">{title}</h3>
      </div>

      <div className="bg-[#F9E1D9] p-4 rounded-xl">
        {/* Session Time */}
        <p className="text-sm md:text-base text-gray-700">
          <span className="font-semibold text-[#510f30]">{description}</span>
        </p>

        {/* Sessions + Price */}
        <div className="flex justify-between mt-3 text-sm md:text-base">
          <p className="font-semibold text-[#510f30]">
            Sessions{" "}<span className="text-[#FF0068] font-bold">{sessions}</span>
          </p>

          <p className="font-semibold text-[#510f30]">
            Price{" "}<span className="text-[#FF0068] font-bold">{price}</span>
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button onClick={onSelect}
          className="mt-4 w-[60%] bg-[#F49C7A] hover:bg-[#F49C7A] text-[#510f30] font-bold 
        py-2 rounded-xl text-sm md:text-base">Select Package</button>
      </div>
    </div>
  );
}
