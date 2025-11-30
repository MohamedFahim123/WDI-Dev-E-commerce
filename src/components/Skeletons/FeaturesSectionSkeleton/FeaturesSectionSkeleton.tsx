import React from "react";
import Container from "../../Container/Container";
import FeatureCardSkeleton from "../FeatureCardSkeleton/FeatureCardSkeleton";

function FeaturesSectionSkeleton() {
  const features = new Array(5).fill(null);

  return (
    <section className="bg-white py-6 md:py-10">
      <Container className="overflow-hidden">
        <div className="pl-2 flex gap-2">
          {features.map((_, i) => (
            <div
              key={i}
              className="pl-2 flex-shrink-0 basis-[90%] sm:basis-[60%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <FeatureCardSkeleton />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default React.memo(FeaturesSectionSkeleton);
