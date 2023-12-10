import Lottie from 'lottie-react';
import logoAnimationLottie from '../../Lottie/Animation - 1702221223951.json';

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-boxdark-2 ">
      <div className="  relative ">
        <div className="flex flex-col justify-center">
            <Lottie animationData={logoAnimationLottie} loop={true} />

          
        </div>
      </div>
    </div>
  );
};

export default Loader;
