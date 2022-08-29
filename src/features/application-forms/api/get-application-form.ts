import { unwrapResultDto, type ResultDto } from "@/lib/api";
import { axios } from "@/lib/axios";
import { PROTOCOLS_API_URL } from "@/shared/config";
import {
  mapEarlyTerminationApplicationFormFromDto,
  type DetailApplicationForm,
  type DetailApplicationFormDto,
} from "@/features/application-forms";

interface GetApplicationFormPayload {
  applicationFormID: string;
}

export const getApplicationForm = async (
  payload: GetApplicationFormPayload
): Promise<DetailApplicationForm> =>
  axios
    .get<ResultDto<DetailApplicationFormDto>>(
      `${PROTOCOLS_API_URL}/api/v1/application_form/${payload.applicationFormID}`
    )
    .then(unwrapResultDto)
    .then((data) => mapEarlyTerminationApplicationFormFromDto(data));
