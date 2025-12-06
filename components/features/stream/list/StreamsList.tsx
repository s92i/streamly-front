import { CustomHeading } from "@/components/ui/elements/CustomHeading";
import type { FindRandomStreamsQuery } from "@/graphql/generated/output";
import { StreamsCard } from "./StreamsCard";
import { EmptyState } from "@/components/ui/elements/EmptyState";

interface StreamsListProps {
  heading?: string;
  streams: FindRandomStreamsQuery["findRandomStreams"];
}

export function StreamsList({ heading, streams }: StreamsListProps) {
  return streams.length ? (
    <>
      {heading && <CustomHeading title={heading} />}
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
        {streams.map((stream, index) => (
          <StreamsCard key={index} stream={stream} />
        ))}
      </div>
    </>
  ) : (
    <EmptyState />
  );
}
