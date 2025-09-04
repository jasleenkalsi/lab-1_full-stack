
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      © {year} Pixell River Financial
    </footer>
  );
}