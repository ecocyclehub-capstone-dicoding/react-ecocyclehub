const Leaderboard = ({ users }) => {
  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>{index + 1}</span>

            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />

            <h3>{user.name}</h3>
          </div>

          <p className="font-bold text-[#1f6a32]">{user.points}</p>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
