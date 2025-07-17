import { FC, useState } from "react";
import { IPollAnswer } from "@/entities/polls";
import { Rating } from "@/shared/ui";

interface IPollsRatingAnswerProps {
  setCurrentAnswer: React.Dispatch<React.SetStateAction<IPollAnswer[] | null>>;
  maxRating: number;
  minRating: number;
  currentAnswer?: IPollAnswer[] | null;
}

export const PollsRatingAnswer: FC<IPollsRatingAnswerProps> = ({
  maxRating,
  minRating,
  setCurrentAnswer,
  currentAnswer = null,
}) => {
  const [rating, setRating] = useState<number | null>(() =>
    currentAnswer?.[0]?.title ? Number(currentAnswer[0].title) : null,
  );
  const handleChangeRatingValue = (value: number) => {
    setRating(value);
    setCurrentAnswer([
      {
        title: String(value),
      },
    ]);
  };

  return (
    <Rating
      minRating={minRating}
      maxRating={maxRating}
      rating={rating}
      onRate={handleChangeRatingValue}
    />
  );
};
