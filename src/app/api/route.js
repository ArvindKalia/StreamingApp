import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = (request) => {
  const token = jwt.sign(
    {
    data: {
      name: "Arvind Kalia",
      role: "ADMIN",
        },
    },
    process.env.ADMIN_SECRET,
    {
        expiresIn:600
    }
  );
  return NextResponse.json(
    {
     token:token
    },
    { status: 200 }
  );
};
