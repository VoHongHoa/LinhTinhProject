export function generateRandomString(length: any) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function parseParamsFromUrl(url: string) {
  try {
    const u = new URL(url, "http://dummy.com");
    return Array.from(u.searchParams.entries()).map(([key, value]) => ({ key, value }));
  } catch {
    return [{ key: "", value: "" }];
  }
}

export function buildUrlWithParams(baseUrl: string, params: { key: string; value: string }[]) {
  if (!baseUrl) return "";
  let urlObj : any;
  try {
    urlObj = new URL(baseUrl);
  } catch {
    // Nếu baseUrl không có protocol, thêm tạm để parse
    urlObj = new URL(baseUrl, "http://dummy.com");
  }
  urlObj.search = "";
  params.forEach((p) => {
    if (p.key) urlObj.searchParams.append(p.key, p.value);
  });
  let url = urlObj.toString();
  // Nếu dùng dummy, bỏ phần protocol và host
  if (url.startsWith("http://dummy.com")) {
    url = url.replace("http://dummy.com", "");
  }
  return url;
}