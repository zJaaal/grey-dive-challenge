import { rawData } from "../../../data";
import parseDataToSchema from "./parseDataToSchema";

//Here I centralize the schemas
export const formSchemas = parseDataToSchema(rawData);
