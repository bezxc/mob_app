import { useState } from "react";
import { RelativeForm, RelativesList } from "@/entities/relatives";
import { GradientButton } from "@/shared/ui";

export const Relatives = () => {
  const [isVisibleForm, setIsVisibleForm] = useState<boolean>(false);

  return (
    <>
      <RelativesList />
      {isVisibleForm && (
        <RelativeForm
          isVisibleForm={isVisibleForm}
          setIsVisibleForm={setIsVisibleForm}
        />
      )}
      <GradientButton
        gradientStyles={{ paddingVertical: 15 }}
        disabled={isVisibleForm}
        onPress={() => setIsVisibleForm((prev) => !prev)}
      >
        Добавить родственника
      </GradientButton>
    </>
  );
};
