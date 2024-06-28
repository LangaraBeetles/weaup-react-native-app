import { PostureRecordInput } from "@src/interfaces/posture.types";
import api from "@src/services/api";

const route = "/posture/records";

export const savePostureRecords = async (
  records: Array<PostureRecordInput>,
) => {
  const { data } = await api.post(route, records);

  return data;
};
