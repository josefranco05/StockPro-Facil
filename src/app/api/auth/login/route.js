import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

const HARDCODED_USER = {
  _id: "hardcoded-admin-id",
  user_name: "admin",
  password: "password",
  email: "admin@example.com",
  rol: "admin",
  phone: "",
  created: new Date().toISOString(),
};

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (username !== HARDCODED_USER.user_name || password !== HARDCODED_USER.password) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const token = signToken({ id: HARDCODED_USER._id, username: HARDCODED_USER.user_name });
    const res = NextResponse.json({ message: "Login exitoso" });
    res.cookies.set(
      "token",
      JSON.stringify({
        token,
        userId: HARDCODED_USER._id,
        userName: HARDCODED_USER.user_name,
        userEmail: HARDCODED_USER.email,
        userRol: HARDCODED_USER.rol,
        userPhone: HARDCODED_USER.phone,
        userCreated: HARDCODED_USER.created,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 20,
        path: "/",
      }
    );
    return res;
  } catch (err) {
    console.error("Error en login:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
