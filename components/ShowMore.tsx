"use client";

import { Text, TouchableOpacity, LayoutAnimation } from "react-native";
import * as AC from "@bacons/apple-colors";
import { useState } from "react";

LayoutAnimation.easeInEaseOut();
export default function ShowMore({ text }: { text: string }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <Text
        numberOfLines={showMore ? undefined : 5}
        style={{
          color: AC.label,
          lineHeight: 20,
          fontSize: 16,
        }}
      >
        {text}
      </Text>
      {text?.length > 250 && (
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text
            style={{
              color: AC.systemPurple,
              marginTop: 8,
              fontSize: 16,
            }}
          >
            {showMore ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
