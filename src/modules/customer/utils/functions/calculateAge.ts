export const calculateAge = (birth_date: string): number => {
    return Math.floor(
        (Date.now() - new Date(birth_date).getTime()) / 1000 / 60 / 60 / 24 / 365,
    );
};
