import Button from "./Button";

function ListingCard({ image, description, label, icon: Icon }) {
  return (
    <div
      className="
        relative 
        rounded-xl 
        overflow-hidden 
        shadow-lg
        group 
        transition-transform 
        duration-300 
        hover:scale-105
        w-full 
        max-w-[300px]  /* Controls max width */
      "
    >
      {/* Image with Overlay */}
      <div className="relative w-full h-[250px]"> {/* Set a fixed height */}
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={image}
          alt="Listing"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Icon & Label */}
      <div
        className="
          absolute 
          top-4 
          left-4 
          flex 
          items-center 
          space-x-2 
          bg-white 
          p-3 
          rounded-full 
          shadow-md
        "
      >
        <Icon className="text-green-500 text-2xl" />
      </div>

      {/* Card Footer with Label */}
      <div
        className="
          absolute bottom-6 left-4 right-4
          bg-black/60  /* Semi-transparent background */
          text-white 
          text-lg font-semibold
          px-3 py-1
          rounded-md
          text-center
          shadow-md
        "
      >
        <h2 className="text-white">{label}</h2>
      </div>

      {/* Hover Description */}
      <div
        className="
          absolute inset-0 
          flex items-center justify-center 
          bg-black/70 
          text-white text-center 
          text-sm px-6 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-300
        "
      >
        {description}
      </div>
    </div>
  );
}

export default ListingCard;
