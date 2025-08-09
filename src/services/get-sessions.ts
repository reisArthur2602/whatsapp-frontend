export const getSessions = async () => {
  const response = await fetch("http://localhost:3000/sessions", {
    method: "GET",
  });
  const sessions = await response.json();

  return sessions;
};
