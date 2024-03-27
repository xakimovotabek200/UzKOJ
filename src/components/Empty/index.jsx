import { Text, Translated } from "../Typography";

const index = () => {
  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <img src="./empty.png" alt="empty" className="max-w-32" />
      <Text>
        <Translated>Ma'lumot mavjud emas</Translated>
      </Text>
    </div>
  );
};

export default index;
