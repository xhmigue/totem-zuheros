import Swal from "sweetalert2";
const _serverPanel2 =
  process.env.TEST === "1"
    ? "http://localhost:3000"
    : "https://panel2.modularbox.com";
export const serverPanel =
  process.env.TEST === "1"
    ? "http://localhost:8000"
    : "https://panel.modularbox.com";

export async function generalx(
  route: string,
  body: Record<string, any>,
  fetchApi: (
    url: string,
    body: Record<string, any> | FormData,
  ) => Promise<Response>,
): Promise<any | null> {
  const url = `${_serverPanel2}/${route}`;
  console.log(url);
  try {
    const response = await fetchApi(url, body);
    if (response.status === 400) {
      const data = (await response.json()) as { html: string };
      Swal.fire("Error", data.html, "warning");
      return null;
    }
    if (response.status !== 200) throw new Error("Error en la solicitud");
    return (await response.json()) as any;
  } catch (error) {
    console.error(error);
    Swal.fire(
      "Error",
      "Lo sentimos ocurrio un error en el servidor. Intentelo mas tarde.",
      "error",
    );
    return null;
  }
}
async function postFetch(url: string, body: Record<string, any>) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function postx(
  route: string,
  body: Record<string, any>,
): Promise<any | null> {
  return generalx(route, body, postFetch);
}

export async function uploadx(
  route: string,
  body: FormData,
): Promise<any | null> {
  return generalx(route, body, uploadFetch);
}

async function uploadFetch(url: string, body: FormData) {
  return fetch(url, {
    method: "POST",
    body,
  });
}
