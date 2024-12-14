import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import { useGameContext } from "../context/GameContext";

const MobileButton = () => {
  const { moveDown, moveLeft, moveRight, rotate } = useGameContext();
  return (
    <div className="flex w-full justify-evenly items-center mt-2 md:hidden">
      <button
        onClick={moveLeft}
        className="rounded-2xl bg-gray-800 px-6  py-1.5 text-sm text-white shadow-lg shadow-neutral-500/20 transition active:scale-[.95]"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={rotate}
        className="rounded-2xl bg-gray-800 px-6  py-1.5 text-sm text-white shadow-lg shadow-neutral-500/20 transition active:scale-[.95]"
      >
        <FaRotate />
      </button>
      <button
        onClick={moveDown}
        className="rounded-2xl bg-gray-800 px-6  py-1.5 text-sm text-white shadow-lg shadow-neutral-500/20 transition active:scale-[.95]"
      >
        <FaArrowDownLong />
      </button>
      <button
        onClick={moveRight}
        className="rounded-2xl bg-gray-800 px-6  py-1.5 text-sm text-white shadow-lg shadow-neutral-500/20 transition active:scale-[.95]"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default MobileButton;
