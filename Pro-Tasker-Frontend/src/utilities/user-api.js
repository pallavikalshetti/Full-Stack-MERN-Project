export default async function getUsers() {
  try {
    const response = await fetch(import.meta.env.VITE_SERVER + '/api/users');
    const data = await response.json();
    return data;
  } catch(error) {
    console.error(error)
  }
}

export async function createUser(formData, setState) {
  try {
    const response = await fetch(import.meta.env.VITE_SERVER + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    const users = await getUsers();
    setState(users);
  } catch(error) {
      console.error(error);
  }
}