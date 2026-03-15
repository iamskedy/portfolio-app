import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/models/db";
import models from "@/models/schemas";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { action, email, password } = await request.json();

    if (!action || !email || !password) {
      return NextResponse.json({ error: "Missing action/email/password" }, { status: 400 });
    }

    if (action === "register") {
      const existing = await models.Admin.findOne({ email });
      if (existing) {
        return NextResponse.json({ error: "Admin already exists" }, { status: 409 });
      }
      const password_hash = await bcrypt.hash(password, 10);
      const admin = await models.Admin.create({ email, password_hash });
      return NextResponse.json({ data: { id: admin._id, email: admin.email } }, { status: 201 });
    }

    if (action === "login") {
      const admin = await models.Admin.findOne({ email });
      if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      admin.last_login = new Date();
      await admin.save();
      return NextResponse.json({ data: { id: admin._id, email: admin.email, role: admin.role } });
    }

    return NextResponse.json({ error: "Action must be register or login" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Admin route failure" }, { status: 500 });
  }
}
