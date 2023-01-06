import { data } from "../../../data";
import parseDataToSchema from "./parseDataToSchema";

export const formSchemas = parseDataToSchema(data);
