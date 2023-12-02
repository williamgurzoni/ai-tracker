import repos from '../repositories.json';

export default function Stats() {
  return (
    <div className="text-lg font-bold text-cyan-700 text-center">
      Following {repos.length} repositories
    </div>
  );
}
