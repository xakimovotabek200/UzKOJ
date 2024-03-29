import { Link, useLocation, useParams } from "react-router-dom";
import { Button, P, Text, Translated } from "../../components";
import { BASE_URL } from "../../constants";
import DeleteEvents from "./DeleteEvents";

const FullEvent = () => {
  const { id } = useParams();
  const { state } = useLocation();

  return (
    <div>
      <div className="flex items-center justify-center flex-col gap-3">
        <img
          src={BASE_URL + "/api/images/" + state?.photo}
          alt="tadbir rasmi"
          className="border max-h-96"
        />
        <div className="flex items-center gap-3">
          <P className="font-semibold">
            <Translated>Tadbir nomi</Translated>:
          </P>
          <P>{state?.name}</P>
        </div>
        <div className="flex items-center gap-3">
          <Text className="font-semibold">
            <Translated>Tadbir turi</Translated>:
          </Text>
          <Text>{state?.type}</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text className="font-semibold">
            <Translated>Qatnashuvchilar soni</Translated>:
          </Text>
          <Text>{state?.attendeeCount}</Text>
        </div>
        <div className="flex items-center gap-3">
          <Text className="font-semibold">
            <Translated>Izoh</Translated>:
          </Text>
          <Text>{state?.comment}</Text>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-20">
          <div className="col-span-2">
            <Link to={`/edit-event/${id}`} state={state}>
              <Button className="bg-blue-500 text-white">
                <span className="fa-solid fa-edit mr-2" />
                <Translated>Tahrirlash</Translated>
              </Button>
            </Link>
          </div>
          <DeleteEvents id={id} />
        </div>
      </div>
    </div>
  );
};

export default FullEvent;
