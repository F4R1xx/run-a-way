import { ref, update, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { database } from './firebase.js';

// Define todas as conquistas possíveis no sistema
export const allAchievements = [
    // =================================================================
    // TIER BRONZE: Conquistas de entrada e marcos iniciais
    // =================================================================
    { id: 'first_walk', title: 'Saiu da Jaula o Monstro!', description: 'Registre sua primeira caminhada', icon: 'fa-flag-checkered', type: 'total_walks', value: 1, tier: 'bronze' },
    { id: 'walk_5km', title: 'Esquentando as Turbinas', description: '5 km em uma única caminhada', icon: 'fa-person-walking', type: 'single_walk_distance', value: 5, tier: 'bronze' },
    { id: 'walk_10km', title: 'Pernas pra que te quero!', description: '10 km em uma caminhada', icon: 'fa-shoe-prints', type: 'single_walk_distance', value: 10, tier: 'bronze' },
    { id: 'total_50km', title: 'Dono(a) da Rua', description: 'Atinja 50 km no total', icon: 'fa-map-location-dot', type: 'total_distance', value: 50, tier: 'bronze' },
    { id: 'calories_1000', title: 'Adeus, Pizza de Ontem', description: '1000 kcal em um único dia', icon: 'fa-fire', type: 'daily_calories', value: 1000, tier: 'bronze' },
    { id: 'streak_3days', title: 'Já Viciou, né?', description: 'Caminhou por 3 dias seguidos', icon: 'fa-calendar-plus', type: 'streak', value: 3, tier: 'bronze' },
    { id: 'streak_7days', title: 'Compromisso de Casamento', description: 'Caminhou por 7 dias seguidos', icon: 'fa-calendar-check', type: 'streak', value: 7, tier: 'bronze' },
    { id: 'walks_in_day_2', title: 'Fui Ali e Volto Já... de Novo', description: 'Faça 2 caminhadas no mesmo dia', icon: 'fa-repeat', type: 'walks_in_a_day', value: 2, tier: 'bronze' },
    { id: 'early_bird', title: 'Galinha Madrugadora', description: 'Faça uma caminhada antes das 6h da manhã', icon: 'fa-cloud-sun', type: 'time_of_day', value: { start: 0, end: 6 }, tier: 'bronze' },
    { id: 'night_owl', title: 'Batman da Caminhada', description: 'Faça uma caminhada depois das 22h', icon: 'fa-moon', type: 'time_of_day', value: { start: 22, end: 24 }, tier: 'bronze' },

    // =================================================================
    // TIER PRATA: Desafios intermediários
    // =================================================================
    { id: 'walk_21km', title: 'Meio Maratonista, Inteiro Cansado', description: '21.1 km em uma caminhada', icon: 'fa-road', type: 'single_walk_distance', value: 21.1, tier: 'silver' },
    { id: 'total_100km', title: 'Meu Bairro Ficou Pequeno', description: 'Atinja 100 km no total', icon: 'fa-city', type: 'total_distance', value: 100, tier: 'silver' },
    { id: 'total_250km', title: 'Desbravador(a) de CEP', description: 'Atinja 250 km no total', icon: 'fa-signs-post', type: 'total_distance', value: 250, tier: 'silver' },
    { id: 'monthly_100km', title: 'Carteirinha do Clube dos 100', description: '100 km no mês', icon: 'fa-calendar-alt', type: 'monthly_distance', value: 100, tier: 'silver' },
    { id: 'monthly_200km', title: 'No Pain, No Gain, No Uber', description: '200 km no mês', icon: 'fa-dumbbell', type: 'monthly_distance', value: 200, tier: 'silver' },
    { id: 'calories_2000', title: 'Churrasco de Amanhã tá Pago', description: '2000 kcal em um único dia', icon: 'fa-fire-flame-curved', type: 'daily_calories', value: 2000, tier: 'silver' },
    { id: 'streak_15days', title: 'Mais Fiel que Muito Namoro', description: 'Caminhou por 15 dias seguidos', icon: 'fa-calendar-week', type: 'streak', value: 15, tier: 'silver' },
    { id: 'speed_10km_fast', title: 'The Flash de Tênis', description: '10 km em menos de 90 minutos', icon: 'fa-bolt', type: 'speed', value: { distance: 10, time: 90 }, tier: 'silver' },
    { id: 'total_walks_50', title: '50 Tons de Cansaço', description: 'Complete 50 caminhadas', icon: 'fa-award', type: 'total_walks', value: 50, tier: 'silver' },
    { id: 'week_explorer', title: 'Não Pulo Nenhum Dia', description: 'Caminhe em todos os 7 dias da semana', icon: 'fa-calendar-day', type: 'week_explorer', value: 7, tier: 'silver' },
    { id: 'walks_in_day_3', title: 'Pediu Música no Fantástico', description: 'Faça 3 caminhadas no mesmo dia', icon: 'fa-person-running', type: 'walks_in_a_day', value: 3, tier: 'silver' },

    // =================================================================
    // TIER OURO: Conquistas difíceis para usuários dedicados
    // =================================================================
    { id: 'walk_42km', title: 'Zerei a Vida (e as pernas)', description: '42.2 km em uma caminhada', icon: 'fa-medal', type: 'single_walk_distance', value: 42.2, tier: 'gold' },
    { id: 'total_500km', title: 'GPS Precisa de Update', description: 'Atinja 500 km no total', icon: 'fa-map-marked-alt', type: 'total_distance', value: 500, tier: 'gold' },
    { id: 'total_1000km', title: 'Daqui a Saturno é um Pulo', description: 'Atinja 1000 km no total', icon: 'fa-crown', type: 'total_distance', value: 1000, tier: 'gold' },
    { id: 'monthly_300km', title: 'Meu Tênis Pediu Arrego', description: '300 km no mês', icon: 'fa-person-hiking', type: 'monthly_distance', value: 300, tier: 'gold' },
    { id: 'day_50km', title: 'Onde Fui Amarrar Meu Bode?', description: '50 km em um único dia', icon: 'fa-sun', type: 'daily_distance', value: 50, tier: 'gold' },
    { id: 'calories_3000', title: 'Queimei a Ceia de Natal', description: '3000 kcal em um único dia', icon: 'fa-atom', type: 'daily_calories', value: 3000, tier: 'gold' },
    { id: 'streak_30days', title: 'Mais Regular que Boleto', description: 'Caminhou por 30 dias seguidos', icon: 'fa-shield-alt', type: 'streak', value: 30, tier: 'gold' },
    { id: 'speed_21km_fast', title: 'Comendo Poeira? Só se for a minha', description: '21.1 km em menos de 3 horas', icon: 'fa-jet-fighter-up', type: 'speed', value: { distance: 21.1, time: 180 }, tier: 'gold' },
    { id: 'total_walks_100', 'title': 'Centurião da Caminhada', description: 'Complete 100 caminhadas', icon: 'fa-shield-halved', type: 'total_walks', value: 100, tier: 'gold' },
    { id: 'weekend_warrior', title: 'Meu Sábado é na Pista', description: 'Caminhe 30km entre Sábado e Domingo', icon: 'fa-calendar-days', type: 'weekend_distance', value: 30, tier: 'gold' },

    // =================================================================
    // TIER PLATINA: Desafios de elite, para os mais persistentes
    // =================================================================
    { id: 'walk_50km', title: 'Forrest Gump, é você?', description: '50 km em uma caminhada', icon: 'fa-infinity', type: 'single_walk_distance', value: 50, tier: 'platina' },
    { id: 'total_2500km', title: 'Deu a Volta ao Mundo a Pé?', description: 'Atinja 2500 km no total', icon: 'fa-earth-americas', type: 'total_distance', value: 2500, tier: 'platina' },
    { id: 'monthly_500km', title: 'O Exterminador de Tênis', description: '500 km no mês', icon: 'fa-mountain-sun', type: 'monthly_distance', value: 500, tier: 'platina' },
    { id: 'streak_100days', title: 'A Lenda Viva', description: 'Caminhou por 100 dias seguidos', icon: 'fa-meteor', type: 'streak', value: 100, tier: 'platina' },
    { id: 'total_walks_365', title: 'Calendário de Ouro', description: 'Complete 365 caminhadas', icon: 'fa-star', type: 'total_walks', value: 365, tier: 'platina' },
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
    const totalWalksCount = walks.length;

    for (const ach of allAchievements) {
        if (currentAchievements[ach.id]) continue;

        let unlocked = false;
        switch (ach.type) {
            case 'total_walks':
                if (totalWalksCount >= ach.value) unlocked = true;
                break;
            case 'single_walk_distance':
                if (walks.some(walk => walk.distance >= ach.value)) unlocked = true;
                break;
            case 'total_distance':
                if (totalDistance >= ach.value) unlocked = true;
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
            case 'walks_in_a_day':
                const walksPerDay = {};
                walks.forEach(walk => {
                    walksPerDay[walk.date] = (walksPerDay[walk.date] || 0) + 1;
                });
                if (Object.values(walksPerDay).some(count => count >= ach.value)) unlocked = true;
                break;
            case 'time_of_day':
                if (walks.some(w => {
                    const hour = new Date(w.createdAt).getHours();
                    return hour >= ach.value.start && hour < ach.value.end;
                })) unlocked = true;
                break;
            case 'week_explorer':
                const daysOfWeek = new Set();
                walks.forEach(w => {
                    const day = new Date(w.date).getUTCDay();
                    daysOfWeek.add(day);
                });
                if (daysOfWeek.size >= ach.value) unlocked = true;
                break;
            case 'weekend_distance':
                const weekendTotals = {};
                walks.forEach(w => {
                    const date = new Date(w.date);
                    const day = date.getUTCDay();
                    if (day === 6 || day === 0) {
                        const weekStart = new Date(date);
                        weekStart.setDate(date.getDate() - day);
                        const weekKey = weekStart.toISOString().substring(0, 10);
                        weekendTotals[weekKey] = (weekendTotals[weekKey] || 0) + w.distance;
                    }
                });
                if (Object.values(weekendTotals).some(total => total >= ach.value)) unlocked = true;
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
