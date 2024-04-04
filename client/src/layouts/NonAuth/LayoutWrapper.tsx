import { PropsWithChildren } from "react";
import mainImage from "../../assets/images/main-image.png";
import { pulse } from "react-animations";
import styled, { keyframes } from "styled-components";

const LayoutWrapper = (props: PropsWithChildren) => {
  return (
    <div className=" flex flex-col md:grid md:grid-cols-2 bg-[var(--auth-bg)] h-dvh w-dvw">
      <div className="h-full col-span-1">
        <div className="w-full h-full flex justify-center">
          <div className="w-11/12 sm:w-10/12 md:w-full bg-white p-4 flex flex-col justify-between rounded-b-md md:rounded-none overflow-y-auto">
            <div>
              <h1 className="text-2xl font-medium">Songify</h1>
            </div>
            <div className="self-center w-full mx-auto">{props.children}</div>
            <div>
              <p className="text-xs font-normal">&copy; Songify 2024</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 max-w-[100px] sm:max-w-[150px] mx-auto my-8 md:my-0 md:max-w-none flex md:w-full h-max md:h-full justify-center items-center col-span-1">
        {/* <BouncyDiv className="lg:w-3/4 aspect-square overflow-hidden md:w-3/5 max-w-[400px]">
          <img src={mainImage} className="w-full h-full object-contain" />
        </BouncyDiv> */}
        <div className="relative h-full w-full bg-[var(--faded-white)] md:flex justify-center items-center hidden">
          <div className="w-[180px] h-[180px] aspect-square rounded-full bg-[var(--base-color)]"></div>
          <div className="absolute bg-var(--primary-color) bottom-0 left-0 right-0 h-1/2 z-10 morphism-glass"></div>
        </div>
      </div>
    </div>
  );
};

// Keyframes
const bounceAnimation = keyframes`${pulse}`;

// Styled components
const BouncyDiv = styled.div`
  animation: 3s ${bounceAnimation} infinite linear;
`;

export default LayoutWrapper;
