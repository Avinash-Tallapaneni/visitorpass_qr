import QRCode from "qrcode";
import { db } from "../database";
import { eq } from "drizzle-orm";
import { visitors } from "../database/schema";
import { sendMail } from "../helpers/sendMail";

export const generateQR = async (visitorId: string) => {
  try {
    const visitorData = await db
      .select({
        name: visitors.name,
        email: visitors.email,
        phoneNumber: visitors.phoneNumber,
        visitingPersonName: visitors.visitingPersonName,
        avatar: visitors.avatar,
        role: visitors.role,
      })
      .from(visitors)
      .where(eq(visitors.id, visitorId))
      .limit(1);

    const visitor = visitorData[0];

    if (!visitor) {
      throw new Error("Missing required visitor data");
    }

    const qrData = JSON.stringify({
      name: visitor.name,
      email: visitor.email,
      phoneNumber: visitor.phoneNumber,
      visitingPersonName: visitor.visitingPersonName,
      role: visitor.role,
      visitorId: visitorId,
    });

    const qrCodeUrl = await QRCode.toDataURL(qrData);

    if (!qrCodeUrl) {
      throw new Error("QR Code generation failed");
    }
    console.log("qrCodeUrl", qrCodeUrl);

    const mailSent = await sendMail(visitor.email, qrCodeUrl);

    if (!mailSent.success) {
      throw new Error("Failed to send email");
    }
    console.log("mailSent", mailSent);

    return qrCodeUrl;
  } catch (err) {
    console.error("QR Code generation failed:", err);
    throw err;
  }
};
