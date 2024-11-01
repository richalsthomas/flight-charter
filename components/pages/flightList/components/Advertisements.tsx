import Image from "next/image";

const advertisements = [
  {
    image: "/1d54148b2c63e9ade161daf8943b543b.jpeg",
    label: "International Guideline",
    text: "COVID safety measures adopted by various countries including VISA restrictions, quarantine rules, etc.",
    buttonLabel: "View guidelines",
  },
  {
    image: "/b6d8ba7d1237d0deb6b32ea562f44b4c.jpeg",
    label: "We’ve found you a great deal!",
    text: "Get more, spend less with up to $575 off when you book your flight + stay together,",
    buttonLabel: "Shop flight",
  },
  {
    image: "/0e8ba6437b456849b4bc5d6373df98e2.png",
    label: "Log-in and get exclusive discounts!",
    text: "Log in and Unlock all the exclusive offers and use wallet etc",
    buttonLabel: "Login/Create Account",
  },
];

export default function Advertisements() {
  return (
    <div className="flex flex-col gap-5">
      {advertisements.map((advertisement, index) => (
        <div
          key={index}
          style={{ boxShadow: "0px 4px 4px 0px #8D8D8D40" }}
          className="w-[250px] flex flex-col bg-white rounded-sm"
        >
          <Image
            height={500}
            width={500}
            className="w-full max-h-[200px] object-contain"
            alt=""
            src={advertisement.image}
          />
          <span className="mt-2 font-semibold px-3">{advertisement.label}</span>
          <span className="mt-2 font-normal text-sm px-3">
            {advertisement.text}
          </span>
          <div className="p-2">
            <button className="text-sm border border-[#5D36AF] rounded text-[#5D36AF] hover:text-white hover:bg-[#5D36AF] duration-300 px-3 py-1 w-full font-semibold">
              {advertisement.buttonLabel}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
