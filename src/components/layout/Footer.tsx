import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-zinc-400">
            © 2026 ShopNext. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}