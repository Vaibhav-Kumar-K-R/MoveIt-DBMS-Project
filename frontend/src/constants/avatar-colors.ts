const avatarFallbackColors = [
  "bg-red-700 text-white font-medium",
  "bg-orange-700 text-white font-medium",
  "bg-amber-700 text-white font-medium",
  "bg-yellow-700 text-white font-medium",
  "bg-lime-700 text-white font-medium",
  "bg-green-700 text-white font-medium",
  "bg-emerald-700 text-white font-medium",
  "bg-teal-700 text-white font-medium",
  "bg-cyan-700 text-white font-medium",
  "bg-blue-700 text-white font-medium",
  "bg-indigo-700 text-white font-medium",
  "bg-violet-700 text-white font-medium",
  "bg-purple-700 text-white font-medium",
  "bg-fuchsia-700 text-white font-medium",
  "bg-pink-700 text-white font-medium",
  "bg-rose-700 text-white font-medium",
];

const avatarFallbackColor = () => {
  const index = Math.floor(Math.random() * avatarFallbackColors.length);
  return avatarFallbackColors[index];
};

export { avatarFallbackColor };
