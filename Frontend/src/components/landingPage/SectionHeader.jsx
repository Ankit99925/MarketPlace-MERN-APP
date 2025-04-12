const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-bold text-green-800">{title}</h2>
    {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    <div className="w-24 h-1 bg-green-500 mx-auto mt-3 rounded-full"></div>
  </div>
);

export default SectionHeader;
