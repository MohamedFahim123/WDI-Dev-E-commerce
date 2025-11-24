import Link from "next/link";
import Container from "../Container/Container";
import { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
  rightSlot?: ReactNode;
}

export function PageHeader({ title, breadcrumb, rightSlot }: PageHeaderProps) {
  return (
    <header className="w-full bg-white">
      <Container>
        <div className="flex items-end justify-between gap-4 pt-2">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-2 text-[10px] text-muted-foreground sm:text-xs"
            >
              <ol className="flex items-center gap-1">
                {breadcrumb.map((item, index) => (
                  <li key={item.label} className="flex items-center gap-1">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="hover:underline"
                        aria-current={
                          index === breadcrumb.length - 1 ? "page" : undefined
                        }
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        aria-current={
                          index === breadcrumb.length - 1 ? "page" : undefined
                        }
                      >
                        {item.label}
                      </span>
                    )}
                    {index !== breadcrumb.length - 1 && (
                      <span aria-hidden="true">/</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <h1 className="mb-4 text-2xl font-semibold leading-tight tracking-tight text-foreground">
              {title}
            </h1>
          </div>

          {rightSlot && (
            <div className="hidden w-full max-w-xs sm:flex justify-end">
              {rightSlot}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
