import Container from "../Container/Container";

export default function Footer() {
  return (
    <footer className="border-t border-[#E4E4E7] py-8">
      <Container>
        <div className="text-center h-full flex items-center justify-center">
          <h6 className="text-[#71717A] font-semibold text-sm leading-6">
            © 2025 WDI. All rights reserved.
          </h6>
        </div>
      </Container>
    </footer>
  );
}
