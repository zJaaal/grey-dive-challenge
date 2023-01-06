import { rawData } from "../../../data";
import parseDataToSchema from "./parseDataToSchema";

export const formSchemas = parseDataToSchema(rawData);
