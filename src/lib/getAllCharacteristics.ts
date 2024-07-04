// lib/getAllCharacteristics.ts

export const getAllCharacteristics = async () => {
    const request = await fetch("https://api.dofusdb.fr/characteristics?$limit=999", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const response = await request.json();
    console.log(response?.data?.map((characteristic) => characteristic.asset));
    return response?.data || [];
};
