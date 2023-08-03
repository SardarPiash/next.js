import { userTextArray } from "@/temp_database/temp_database"

export default function handler(req, res) {
    res.status(200).json(userTextArray)
  }