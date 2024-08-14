import SlotMachine from "@/components/magicui/word-rotate";
const words = ["griddy", "pududans", "draw a moustach", "draw a unibrow,", "one month VIP", "touch grass", "try again"];

export default function page() {
  return (
    <div>
      <SlotMachine words={words} spinTime={5000} className="text-white"  />

      
    </div>
  );
}
