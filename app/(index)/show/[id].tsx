import Stack from "@/components/ui/Stack";
import { renderMedia } from "@/functions/render-movie-details";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

import { ShowPageBody } from "@/components/show-header-background";

export { ErrorBoundary } from "expo-router";

export default function ShowDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ShowPageBody>
      <Stack.Screen
        options={{
          title: "Show",
        }}
      />

      <React.Suspense fallback={<MovieSkeleton />}>
        {renderMedia(id, "tv")}
      </React.Suspense>
    </ShowPageBody>
  );
}

function MovieSkeleton() {
  return (
    <View>
      {/* Hero Section */}
      <View
        style={{ height: 300, backgroundColor: "rgba(120,120,128,0.12)" }}
      />

      {/* Overview Section */}
      <View style={{ padding: 16, gap: 8 }}>
        <View
          style={{
            height: 16,
            width: "90%",
            backgroundColor: "rgba(120,120,128,0.12)",
            borderRadius: 4,
          }}
        />
        <View
          style={{
            height: 16,
            width: "80%",
            backgroundColor: "rgba(120,120,128,0.12)",
            borderRadius: 4,
          }}
        />
        <View
          style={{
            height: 16,
            width: "85%",
            backgroundColor: "rgba(120,120,128,0.12)",
            borderRadius: 4,
          }}
        />
      </View>

      {/* About Section */}
      <View style={{ padding: 16 }}>
        <View
          style={{
            height: 24,
            width: 80,
            backgroundColor: "rgba(120,120,128,0.12)",
            borderRadius: 4,
            marginBottom: 12,
          }}
        />
        <View
          style={{
            backgroundColor: "rgba(120,120,128,0.12)",
            borderRadius: 10,
            gap: 1,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <View
              key={i}
              style={{
                padding: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "rgba(120,120,128,0.08)",
              }}
            >
              <View
                style={{
                  height: 16,
                  width: 100,
                  backgroundColor: "rgba(120,120,128,0.12)",
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  height: 16,
                  width: 150,
                  backgroundColor: "rgba(120,120,128,0.12)",
                  borderRadius: 4,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
