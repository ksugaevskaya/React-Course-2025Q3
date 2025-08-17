import '../global.css';

export default function Layout({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <div className="app-page-container">
      <div className="app-page">{children}</div>
      <div>{details}</div>
    </div>
  );
}
