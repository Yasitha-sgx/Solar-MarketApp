const HeadingOne = ({ text, fontBold }) => {
  return (
    <h1
      className={`text-[40px] sm:text-[48px] ${
        fontBold && "font-bold"
      } leading-[72px] mb-1`}
    >
      {text}
    </h1>
  );
};
export default HeadingOne;
