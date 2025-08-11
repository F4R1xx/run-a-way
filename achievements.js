import { ref, update, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { database } from './firebase.js';

// Define todas as conquistas possíveis no sistema
export const allAchievements = [
    // Tier Bronze
    { id: 'walk_10km', title: 'Apenas o começo', description: '10 km em uma caminhada', icon: 'fa-shoe-prints', type: 'single_walk_distance', value: 10, tier: 'bronze' },
    { id: 'monthly_100km', title: 'Tá na média', description: '100 km no mês', icon: 'fa-calendar-alt', type: 'monthly_distance', value: 100, tier: 'bronze' },
    { id: 'calories_1000', title: 'Aquecendo', description: '1000 kcal em um dia', icon: 'fa-fire', type: 'daily_calories', value: 1000, tier: 'bronze' },
    { id: 'streak_7days', title: 'Consistência é chave', description: 'Caminhou por 7 dias seguidos', icon: 'fa-calendar-check', type: 'streak', value: 7, tier: 'bronze' },

    // Tier Prata
    { id: 'walk_20km', title: 'Passos Largos', description: '20 km em uma caminhada', icon: 'fa-road', type: 'single_walk_distance', value: 20, tier: 'silver' },
    { id: 'monthly_200km', title: 'No Pain, No Gain', description: '200 km no mês', icon: 'fa-dumbbell', type: 'monthly_distance', value: 200, tier: 'silver' },
    { id: 'day_50km', title: 'Ultra Motivado', description: '50 km em um único dia', icon: 'fa-sun', type: 'daily_distance', value: 50, tier: 'silver' },
    { id: 'speed_10km30min', title: 'Velocista', description: '10 km em 30 minutos', icon: 'fa-bolt', type: 'speed', value: { distance: 10, time: 30 }, tier: 'silver' },

    // Tier Ouro
    { id: 'walk_42km', title: 'Maratonista', description: '42.195 km em uma caminhada', icon: 'fa-medal', type: 'single_walk_distance', value: 42.195, tier: 'gold' },
    { id: 'monthly_500km', title: 'Conquistador de Estradas', description: '500 km no mês', icon: 'fa-map-marked-alt', type: 'monthly_distance', value: 500, tier: 'gold' },
    { id: 'streak_30days', title: 'Hábito de Aço', description: 'Caminhou por 30 dias seguidos', icon: 'fa-shield-alt', type: 'streak', value: 30, tier: 'gold' },
    { id: 'total_1000km', title: 'Lenda do Asfalto', description: 'Atingiu 1000 km no total', icon: 'fa-crown', type: 'total_distance', value: 1000, tier: 'gold' },
];


/**
 * Verifica todas as conquistas com base nos dados do usuário e retorna as recém-desbloqueadas.
 * @param {string} userId - O ID do usuário.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de objetos de conquistas recém-desbloqueadas.
 */
export async function checkAchievements(userId) {
    if (!userId) return [];
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return [];

    const userData = snapshot.val();
    const walks = userData.walks ? Object.values(userData.walks) : [];
    const currentAchievements = userData.achievements || {};
    const updates = {};
    const newlyUnlocked = [];

    if (walks.length === 0) return [];
    
    const totalDistance = walks.reduce((sum, walk) => sum + walk.distance, 0);

    for (const ach of allAchievements) {
        if (currentAchievements[ach.id]) continue;

        let unlocked = false;
        switch (ach.type) {
            case 'single_walk_distance':
                if (walks.some(walk => walk.distance >= ach.value)) unlocked = true;
                break;
            case 'daily_distance':
                const dailyDistances = {};
                walks.forEach(walk => {
                    dailyDistances[walk.date] = (dailyDistances[walk.date] || 0) + walk.distance;
                });
                if (Object.values(dailyDistances).some(total => total >= ach.value)) unlocked = true;
                break;
            case 'monthly_distance':
                const monthlyTotals = {};
                walks.forEach(walk => {
                    const monthYear = walk.date.substring(0, 7);
                    monthlyTotals[monthYear] = (monthlyTotals[monthYear] || 0) + walk.distance;
                });
                if (Object.values(monthlyTotals).some(total => total >= ach.value)) unlocked = true;
                break;
            case 'daily_calories':
                const dailyCalories = {};
                walks.forEach(walk => {
                    dailyCalories[walk.date] = (dailyCalories[walk.date] || 0) + walk.calories;
                });
                if (Object.values(dailyCalories).some(total => total >= ach.value)) unlocked = true;
                break;
            case 'speed':
                const durationToMinutes = (duration) => {
                    const parts = duration.split(':');
                    return (+parts[0] * 60) + (+parts[1]) + (+parts[2] / 60);
                };
                if (walks.some(walk => walk.distance >= ach.value.distance && durationToMinutes(walk.duration) <= ach.value.time)) unlocked = true;
                break;
            case 'streak':
                const walkDates = [...new Set(walks.map(w => w.date))].sort();
                if (walkDates.length > 0) {
                    let maxStreak = 0;
                    let currentStreak = 1;
                    for (let i = 1; i < walkDates.length; i++) {
                        const prevDate = new Date(walkDates[i-1]);
                        const currDate = new Date(walkDates[i]);
                        const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);
                        if (diffDays === 1) {
                            currentStreak++;
                        } else if (diffDays > 1) {
                            maxStreak = Math.max(maxStreak, currentStreak);
                            currentStreak = 1;
                        }
                    }
                    maxStreak = Math.max(maxStreak, currentStreak);
                    if (maxStreak >= ach.value) unlocked = true;
                }
                break;
            case 'total_distance':
                if (totalDistance >= ach.value) unlocked = true;
                break;
        }

        if (unlocked) {
            updates[`achievements/${ach.id}`] = true;
            newlyUnlocked.push(ach);
        }
    }

    if (newlyUnlocked.length > 0) {
        await update(userRef, updates);
    }
    
    return newlyUnlocked;
}
