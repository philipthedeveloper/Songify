import avatar from "../assets/images/avatar-64/man-1.png";
import notificationIcon from "../assets/icons/32/3d-bell.png";
import { useProfile } from "../hooks";

const AdminHeader = () => {
  const { userProfile } = useProfile();
  return (
    // <div className="p-6 py-2 md:py-3 bg-[var(--white)] flex justify-between items-center border-b-[1px] border-[lightgray]">
    <div className="p-6 py-2 md:py-3 bg-[var(--white)] flex justify-between items-center drop-shadow-sm">
      <div>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <div className="min-w-10 rounded-full overflow-hidden w-9 md:w-10 lg:w-12 border-2 border-[var(--base-color)] bg-[var(--base-color)] aspect-square relative">
              <img
                src={avatar}
                className="min-w-10 max-w-16 aspect-square w-full object-cover h-full"
              />
            </div>
            <div className="absolute min-w-4 min-h-4 aspect-square rounded-full bg-[var(--active-status)] bottom-0 -right-1 font-semibold"></div>
          </div>
          <div>
            <p className="text-sm font-semibold">
              Goodday, {userProfile && userProfile.fullname.split(" ")[0]}!
            </p>
            <p className="text-xs font-medium mt-1 flex items-center gap-2">
              Let's get to work!
              {/* <img src={star} className="w-5 aspect-square" /> */}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <img src={notificationIcon} className="w-8 aspect-square" />
          <div className="absolute min-w-3 min-h-3 aspect-square p-1 rounded-full bg-[var(--base-color)] top-0 right-0 text-white text-xs flex justify-center items-center font-semibold">
            4
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
