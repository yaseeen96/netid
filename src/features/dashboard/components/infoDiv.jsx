const InfoDiv = ({ title, value, image }) => {
  return (
    <div className="flex flex-row my-4">
      <img src={image} alt="gender" className="mr-4 lg:w-8 xs:w-4 sm:w-6" />
      <h3 className="xs:text-sm sm:text-lg md:text-xl">
        {title}: <span>{value}</span>
      </h3>
    </div>
  );
};

export default InfoDiv;
