import Image from "next/image";

const Logo = () => (
  <div className="relative w-6 h-6">
    <Image src="/logo.svg" alt="deal finder logo" fill />
  </div>
);

export default Logo;
