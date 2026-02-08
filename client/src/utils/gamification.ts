export const LEVEL_thresholds = [
    0,      // Level 1
    100,    // Level 2
    300,    // Level 3
    600,    // Level 4
    1000,   // Level 5
    1500,   // Level 6
    2100,   // Level 7
    2800,   // Level 8
    3600,   // Level 9
    4500    // Level 10
];

export const calculateLevel = (xp: number) => {
    let level = 1;
    for (let i = 0; i < LEVEL_thresholds.length; i++) {
        if (xp >= LEVEL_thresholds[i]) {
            level = i + 1;
        } else {
            break;
        }
    }
    return level;
};

export const xpForNextLevel = (currentLevel: number) => {
    if (currentLevel >= LEVEL_thresholds.length) return 1000000; // Max level cap
    return LEVEL_thresholds[currentLevel];
};

export const getLevelProgress = (xp: number) => {
    const currentLevel = calculateLevel(xp);
    const currentLevelXP = LEVEL_thresholds[currentLevel - 1];
    const nextLevelXP = xpForNextLevel(currentLevel);

    const progressInLevel = xp - currentLevelXP;
    const totalNeeded = nextLevelXP - currentLevelXP;

    return Math.min(100, Math.round((progressInLevel / totalNeeded) * 100));
};

export const BADGES = {
    STREAK_7: "🔥 7 Day Streak",
    EARLY_BIRD: "🌅 Early Bird",
    NIGHT_OWL: "🦉 Night Owl",
    GOAL_CRUSHER: "🎯 Goal Crusher",
    SCHOLAR: "🎓 Scholar"
};
