import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    if (file.size > 10 * 1024 * 1024)
      return NextResponse.json({ error: "파일 크기는 10MB 이하여야 합니다." }, { status: 400 });
    if (!file.type.startsWith("image/"))
      return NextResponse.json({ error: "이미지 파일만 업로드 가능합니다." }, { status: 400 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const ext  = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("luxury-request-images")
      .upload(path, await file.arrayBuffer(), { contentType: file.type });

    if (error) return NextResponse.json({ error: "이미지 업로드 실패: " + error.message }, { status: 500 });

    const { data } = supabase.storage.from("luxury-request-images").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "업로드 중 오류 발생" }, { status: 500 });
  }
}
