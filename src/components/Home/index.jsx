import { NavLink } from "react-router-dom";
import { routes } from "../../router/routes";
import { P, Translated } from "../Typography";

const index = () => {
  return (
    <div>
      <div className="p-2 w-full grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {routes.map((Menu, index) => (
          <NavLink
            to={Menu.path}
            key={index}
            className="rounded-lg bg-white overflow-hidden shadow-md border border-gray-200 transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-sky-50"
          >
            <div className="py-5">
              <div className="flex flex-col items-center justify-between">
                <span className="text-8xl text-blue-500">{Menu.icon}</span>
                <P className="font-semibold border-t w-full mt-8">
                  <Translated>{Menu.title}</Translated>
                </P>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default index;
