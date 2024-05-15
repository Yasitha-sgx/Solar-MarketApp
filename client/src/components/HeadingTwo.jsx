const HeadingTwo = ({ text, isColorChange }) => {
  return (
    <h2
      className={`text-[20px] ${
        isColorChange ? "text-[#EE723C] " : "text-[#BA552A] mb-1"
      }`}
    >
      {text}
    </h2>
  );
};
export default HeadingTwo;
