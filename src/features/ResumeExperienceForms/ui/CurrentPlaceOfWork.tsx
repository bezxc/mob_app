import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { getCurrentHistories } from "@/entities/colleagues";
import { CurrentWorkCareerCard } from "@/entities/vacancy-resume";
import { $auth } from "@/shared/api/auth.store";

export const CurrentPlaceOfWork = () => {
  const { kanUid } = useUnit($auth);

  const { data: histories, isSuccess } = useQuery({
    queryKey: ["histories", { kanUid }],
    queryFn: () => getCurrentHistories({ kan_uid: kanUid as string }),
  });

  return (
    isSuccess && (
      <CurrentWorkCareerCard
        organization_name={histories[0].organization_name}
        date_start={histories[0].date_start}
        date_end={histories[0].date_end}
        position={histories[0].position_name}
        management_name={histories[0].division.management.name}
        department_name={histories[0].division.management.department.name}
      />
    )
  );
};
