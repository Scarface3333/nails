import { useGetMastersQuery } from "@/app/services/appointmentApi";
import { AppointmentCard } from "../appointmentCard";


export const MastersList = () => {
  const { data: masters = [], isLoading } = useGetMastersQuery();

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {masters.map((master) => (
        <AppointmentCard key={master.id} master={master} />
      ))}
    </div>
  );
};
