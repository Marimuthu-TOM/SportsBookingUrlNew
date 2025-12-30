
// import images from "../constants/images";

export default function PaymentSuccess() {
  const payLaterData = {
    nextDueDate: "08-Dec-25",
    steps: [
      {
        id: 1,
        label: "Paid",
        amount: 200,
        currency: "KWD",
        status: "paid",
        dueDate: null
      },
      {
        id: 2,
        label: "2nd",
        amount: 600,
        currency: "KWD",
        status: "due",
        dueDate: "08-Dec-25"
      },
      {
        id: 3,
        label: "3rd",
        amount: 600,
        currency: "KWD",
        status: "upcoming",
        dueDate: "08-Jan-26"
      },
      {
        id: 4,
        label: "4th",
        amount: 600,
        currency: "KWD",
        status: "upcoming",
        dueDate: "08-Feb-26"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full text-center">

        {/* LOGO */}
        <div className="flex justify-center">
          {/* <img src={images.otptom} alt="" /> */}
        </div>

        {/* CHECK ICON */}
        <div className="mt-6 flex justify-center">
          {/* <img src={images.success} /> */}
        </div>

        {/* TEXT */}
        <h2 className="text-xl font-semibold text-[#5b0f3c] mt-4">
          Payment Successful!
        </h2>
        <p className="text-sm font-medium text-[#5b0f3c]">
          A confirmation mail has been sent to
        </p>
        <p className="text-sm font-medium text-[#5b0f3c]">
          dalal@gmail.com
        </p>

        {/* ORDER DETAILS */}
        <div className="mt-6 bg-[#F8E0D8] rounded-2xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="flex justify-between items-center p-4">
            <div>
              {/* <img src={images.otptom} className="w-[60%]" alt="" /> */}
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex justify-center bg-white rounded-xl shadow items-center">
                {/* <img className="bg-white shadow w-[60%] h-[60%]" src={images.promocode} alt="" /> */}
              </button>
              <button className="w-10 h-10 flex justify-center bg-white rounded-xl shadow items-center">
                {/* <img className="bg-white shadow w-[60%] h-[60%]" src={images.creditcard} alt="" /> */}
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white text-sm">
            <div className="px-4 pt-4">
              {[
                ["Order ID", "EV5483R798T098"],
                ["Name", "Dalal"],
                ["Date", "18-Apr-25"],
                ["Time", "10:00 am to 11:30 am"],
                ["Clinic", "Excel Polyclinic"],
                ["Location", "Kuwait City"],
              ].map(([label, value]) => (
                <div className="flex justify-between text-sm mb-3">
                  <div className="flex justify-between w-[40%]">
                    <span className="font-semibold text-[#510f30]">{label}</span>
                    <span className="font-semibold text-[#510f30]">:</span>
                  </div>
                  <div className="w-[60%] text-left pl-2">
                    <span className="font-semibold text-[#510f30]">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-3" />
            <div className="px-4 pb-4">
              <div className="flex justify-between text-md mb-3">
                <div className="flex justify-between w-[25%]">
                  <span className="font-semibold text-[#510f30]">Total Billed</span>
                  <span className="font-semibold text-[#510f30]">:</span>
                </div>
                <div className="w-[75%] text-left pl-2">
                  <span className="font-semibold text-[#FF0068]">2000.00 <span className="text-[9px]">KWD</span></span>
                </div>
              </div>
              <div className="flex">
                <div className="space-y-1 text-sm w-[80%]">
                  <div className="flex justify-between text-sm mb-3">
                    <div className="flex justify-between w-[38%]">
                      <span className="font-semibold text-[#510f30]">Paid so far</span>
                      <span className="font-semibold text-[#510f30]">:</span>
                    </div>
                    <div className="w-[70%] text-left pl-2">
                      <span className="font-semibold text-[#FF0068]">200.00 <span className="text-[9px]">KWD</span></span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <div className="flex justify-between w-[38%]">
                      <span className="font-semibold text-[#510f30]">Pending</span>
                      <span className="font-semibold text-[#510f30]">:</span>
                    </div>
                    <div className="w-[70%] text-left pl-2">
                      <span className="font-semibold text-[#FF0068]">1350.00 <span className="text-[9px]">KWD</span></span>
                    </div>
                  </div>
                </div>
                <div className="w-[30%]">
                  <button className="mt-4 w-[80%] bg-[#F49C7A] text-[#510f30] py-2 rounded-xl font-bold">OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
