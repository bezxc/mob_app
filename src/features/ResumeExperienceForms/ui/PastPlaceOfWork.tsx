import { useUnit } from "effector-react";
import {
  $vacancyResumeForm,
  PastWorkCareerCard,
} from "@/entities/vacancy-resume";

export const PastPlaceOfWork = () => {
  const { thirdStep } = useUnit($vacancyResumeForm);

  const pastWorkPlaces = thirdStep.career_histories?.slice(1) || [];

  return pastWorkPlaces.map(
    ({ id, organization_name, date_start, date_end, position }, index) => (
      <PastWorkCareerCard
        key={id ? id : index}
        id={id as number}
        organization_name={organization_name}
        date_start={date_start}
        date_end={date_end}
        position={position}
        index={index}
      />
    ),
  );
};
