const base_url = 'http://localhost:4000/api/school';


export const getSchools = async (start: number, name:string) => {
    const response = await fetch(`${base_url}?_start=${start}&_limit=10&name=${name}`);
    return response.json();
}


export const createSchool = async (body: FormData) => {
    const response = await fetch(`${base_url}`, {
        method: 'POST',
        body: body,
    });
    return response.json();
}
