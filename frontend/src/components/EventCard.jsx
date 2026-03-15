import React from "react";
import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function EventCard({ event }) {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="
        relative group/card
        backdrop-blur-lg
        
        border border-white/30
        rounded-xl
        p-6
        w-[22rem]
        h-[420px]
        flex flex-col
        shadow-lg
      "
      >
        {/* Title */}
        <CardItem translateZ="60" className="text-lg font-semibold text-white">
          {event.title}
        </CardItem>

        {/* Location + Date */}
        <CardItem
          as="p"
          translateZ="50"
          className="text-sm text-gray-300 mt-1"
        >
          {event.location} • {new Date(event.date).toLocaleString()}
        </CardItem>

        {/* Image */}
        {event.image_url && (
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src={event.image_url}
              alt={event.title}
              className="h-40 w-full object-cover rounded-lg"
            />
          </CardItem>
        )}

        {/* Category */}
        {event.category && (
          <CardItem
            translateZ="30"
            className="
            mt-3
            text-xs
            bg-white/20
            border border-white/30
            text-white
            px-2 py-1
            rounded-md
            w-fit
          "
          >
            {event.category}
          </CardItem>
        )}

        {/* Description */}
        <CardItem
          as="p"
          translateZ="40"
          className="
          text-sm
          text-gray-300
          mt-3
          overflow-hidden
          line-clamp-3
        "
        >
          {event.description}
        </CardItem>

        {/* Button */}
        <div className="mt-auto pt-4">
          <CardItem
            as={Link}
            to={`/event/${event.event_id}`}
            translateZ={40}
            className="
            inline-block
            text-sm
            border border-white/40
            text-white
            px-4 py-2
            rounded-lg
            hover:bg-white/20
            transition
          "
          >
            View Details →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}