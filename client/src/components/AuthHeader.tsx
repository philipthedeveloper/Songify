interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  styles?: string;
}
const AuthHeader = ({ title, subtitle, styles }: AuthHeaderProps) => {
  return (
    <div className={`mb-5 ${styles ? styles : ""}`}>
      <h3 className="text-2xl md:text-3xl font-medium text-gray-700 leading-tight mb-3">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs md:text-sm mt-1 text-gray-600">{subtitle}</p>
      )}
    </div>
  );
};

export default AuthHeader;
