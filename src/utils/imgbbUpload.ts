import { AppError } from "../errors/AppError";

const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

interface ImgbbResponse {
  success: boolean;
  status: number;
  data?: {
    id: string;
    url: string;
    display_url: string;
    delete_url: string;
  };
  error?: {
    message: string;
  };
}

const uploadToImgbb = async (buffer: Buffer, filename?: string): Promise<string> => {
  const apiKey = process.env.IMGBB_API_KEY;

  if (!apiKey) {
    throw new AppError(500, "Image upload service is not configured");
  }

  const base64Image = buffer.toString("base64");

  const body = new URLSearchParams();
  body.append("key", apiKey);
  body.append("image", base64Image);
  if (filename) {
    body.append("name", filename.replace(/\.[^.]+$/, ""));
  }

  let response: Response;
  try {
    response = await fetch(IMGBB_UPLOAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
  } catch {
    throw new AppError(502, "Failed to reach image upload service");
  }

  const result = (await response.json()) as ImgbbResponse;

  if (!response.ok || !result?.success || !result.data) {
    throw new AppError(
      response.status || 502,
      result?.error?.message || "Image upload failed",
    );
  }

  return result.data.display_url || result.data.url;
};

export default uploadToImgbb;
