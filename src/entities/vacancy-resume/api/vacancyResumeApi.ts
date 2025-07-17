import { z } from "zod";
import { getCurrentHistories } from "@/entities/colleagues/api/colleaguesApi";
import { api } from "@/shared/api/baseApi";
import {
  editVacancyResumeRequestSchema,
  getVacancyResumeResponseSchema,
} from "../model/apiSchema";
import { IChangeVacancyResume } from "../model/types";
import {
  setVacancyResumeForm,
  setVacancyResumeFormThirdStep,
} from "../model/vacancyResume.store";

const VACANCIES_URL = process.env.EXPO_PUBLIC_VACANCIES_API_URL;

export const getVacancyResume = async ({ kanUid }: { kanUid: string }) => {
  try {
    const resumeResponse = await api({
      type: "private",
      method: "GET",
      path: `${VACANCIES_URL}/resumes/${kanUid}`,
      requestSchema: z.void(),
      responseSchema: getVacancyResumeResponseSchema,
    })();

    setVacancyResumeForm(resumeResponse);

    const careerHistoriesResponse = await getCurrentHistories({
      kan_uid: kanUid,
    });

    setVacancyResumeFormThirdStep({
      flag: "initialHistories",
      index: 0,
      data: {
        id: resumeResponse.career_histories[0].id || null,
        resume_user_kan_uid: Number(kanUid),
        organization_name: careerHistoriesResponse[0].organization_name,
        date_start: careerHistoriesResponse[0].date_start,
        date_end: careerHistoriesResponse[0].date_end,
        position: careerHistoriesResponse[0].position_name,
        management_name: careerHistoriesResponse[0].division.management.name,
        department_name:
          careerHistoriesResponse[0].division.management.department.name,
        responsibilities:
          resumeResponse.career_histories[0].responsibilities || "",
        progress: resumeResponse.career_histories[0].progress || "",
        reason_for_dismissal:
          resumeResponse.career_histories[0].reason_for_dismissal || "",
        is_current: true,
      },
    });

    return resumeResponse;
  } catch (error) {
    console.error(error);

    const careerHistoriesResponse = await getCurrentHistories({
      kan_uid: kanUid,
    });

    setVacancyResumeForm({
      add_courses: false,
      driver_license: false,
      add_relatives: false,
      desired_salary: undefined,
      driving_experience: null,
      is_married: false,
      motivation: "",
      office_programs: "",
      work_schedule: "",
      supervisor_kan_uid: undefined,
      career_histories: [
        {
          id: null,
          resume_user_kan_uid: Number(kanUid),
          organization_name: careerHistoriesResponse[0].organization_name,
          date_start: careerHistoriesResponse[0].date_start,
          date_end: careerHistoriesResponse[0].date_end,
          position: careerHistoriesResponse[0].position_name,
          management_name: careerHistoriesResponse[0].division.management.name,
          department_name:
            careerHistoriesResponse[0].division.management.department.name,
          responsibilities: "",
          progress: "",
          reason_for_dismissal: "",
          is_current: true,
        },
      ],
    });

    throw error;
  }
};

export const updateVacancyResume = (data: IChangeVacancyResume) =>
  api({
    type: "private",
    method: "PUT",
    path: `${VACANCIES_URL}/resumes`,
    requestSchema: editVacancyResumeRequestSchema,
    responseSchema: editVacancyResumeRequestSchema,
  })(data);
