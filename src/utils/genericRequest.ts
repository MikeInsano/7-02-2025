// Generic request function to make API calls
export const genericRequest = async (url: string, method: string, body: any) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return response.json()
}
