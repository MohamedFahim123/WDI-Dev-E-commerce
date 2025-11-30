import React from "react";
import Container from "../../Container/Container";

function ImagesBannerSkeleton() {
  const images = new Array(10).fill(null);

  return (
    <section>
      <Container className="py-10 overFlowHidden cursor-grab">
        <div className="pl-2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className="pl-2 flex-shrink-0 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="p-2 rounded-md bg-white shadow-sm">
                <div className="w-full h-60 skeleton-shimmer rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default React.memo(ImagesBannerSkeleton);
