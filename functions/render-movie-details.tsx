"use server";

import { Image } from "@/components/img";
import { FadeIn } from "@/components/ui/FadeIn";
import TouchableBounce from "@/components/ui/TouchableBounce";
import { label } from "@bacons/apple-colors";
import { Link, Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import { ParallaxImageWrapper } from "@/components/show-header-background";
import * as AC from "@bacons/apple-colors";
import { BlurView } from "expo-blur";
import {
  CREDITS_FIXTURE,
  MEDIA_COMPANIES_FIXTURE,
  MEDIA_FIXTURE,
  SIMILAR_MEDIA_FIXTURE,
  VIDEOS_FIXTURE,
} from "./fixtures/movie-detail-fixtures";

const USE_FIXTURES = false;

type MediaType = "movie" | "tv";

export async function renderMedia(id: string, type: MediaType = "movie") {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
        }}
      />

      <MediaDetails id={id} type={type} />

      <React.Suspense fallback={<ListSkeleton />}>
        <MediaVideos id={id} type={type} />
      </React.Suspense>

      <React.Suspense fallback={<ListSkeleton />}>
        <MediaCast id={id} type={type} />
      </React.Suspense>

      <React.Suspense fallback={<ListSkeleton />}>
        <MediaCompanies id={id} type={type} />
      </React.Suspense>

      <React.Suspense fallback={<ListSkeleton />}>
        <SimilarMedia id={id} type={type} />
      </React.Suspense>
    </>
  );
}

function HorizontalList({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: label,
          marginBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

function MediaHero({ media, type }: { media: any; type: MediaType }) {
  return (
    <View>
      <View>
        <ParallaxImageWrapper>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${media.backdrop_path}`,
            }}
            style={{
              width: "100%",
              height: 300,
              resizeMode: "cover",
            }}
            transition={300}
          />
        </ParallaxImageWrapper>

        <View
          style={{
            padding: 16,
            marginTop: -60,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 80,

              backgroundColor: AC.systemGroupedBackground,
            }}
          />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${media.poster_path}`,
            }}
            style={{
              width: 100,
              height: 150,
              borderRadius: 8,
              marginRight: 16,
            }}
            transition={300}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: label,
                  marginBottom: 8,
                }}
              >
                {type === "movie" ? media.title : media.name}
              </Text>
              <Text style={{ fontSize: 15, color: label, opacity: 0.8 }}>
                {media.tagline}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 24,
          backgroundColor: AC.systemGroupedBackground,
        }}
      />
    </View>
  );
}

function VideoCard({ video }: { video: any }) {
  return (
    <View style={{ width: 280, marginHorizontal: 4 }}>
      <Image
        source={{ uri: `https://img.youtube.com/vi/${video.key}/0.jpg` }}
        style={{ width: "100%", height: 157, borderRadius: 8 }}
        transition={300}
      />
      <Text
        style={{ fontSize: 14, color: label, marginTop: 4 }}
        numberOfLines={1}
      >
        {video.name}
      </Text>
    </View>
  );
}

function CastCard({ person }: { person: any }) {
  return (
    <Link href={`/person/${person.id}`} asChild push>
      <TouchableBounce style={{ width: 100, marginHorizontal: 4 }}>
        <Image
          source={{
            uri: person.profile_path
              ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
              : "https://via.placeholder.com/100x150",
          }}
          style={{ width: 100, height: 150, borderRadius: 8 }}
          transition={300}
        />
        <Text
          style={{ fontSize: 14, color: label, marginTop: 4 }}
          numberOfLines={1}
        >
          {person.name}
        </Text>
        <Text
          style={{ fontSize: 12, color: label, opacity: 0.7 }}
          numberOfLines={1}
        >
          {person.character}
        </Text>
      </TouchableBounce>
    </Link>
  );
}

function CompanyCard({ company }: { company: any }) {
  return (
    <View
      style={{ alignItems: "center", marginHorizontal: 8, gap: 4, width: 100 }}
    >
      <BlurView
        style={{
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
          overflow: "hidden",
        }}
        intensity={100}
        tint="systemChromeMaterial"
      >
        {company.logo_path && (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w200${company.logo_path}`,
            }}
            style={{ width: 80, height: 80, resizeMode: "contain" }}
            transition={300}
          />
        )}
      </BlurView>
      <Text
        style={{
          fontSize: 12,
          color: label,
          marginTop: 4,
          fontWeight: "600",
        }}
        numberOfLines={2}
      >
        {company.name}
      </Text>
    </View>
  );
}

function MediaCard({ media, type }: { media: any; type: MediaType }) {
  return (
    // @ts-expect-error
    <Link href={`/${type}/${media.id}`} asChild>
      <TouchableBounce style={{ marginHorizontal: 4 }}>
        <View style={{ width: 140 }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w300${media.poster_path}`,
            }}
            style={{ width: 140, height: 210, borderRadius: 8 }}
            transition={300}
          />
          <Text
            style={{ fontSize: 14, color: label, marginTop: 4 }}
            numberOfLines={2}
          >
            {type === "movie" ? media.title : media.name}
          </Text>
          <Text style={{ fontSize: 12, color: label, opacity: 0.7 }}>
            ★ {media.vote_average.toFixed(1)}
          </Text>
        </View>
      </TouchableBounce>
    </Link>
  );
}

async function MediaDetails({ id, type }: { id: string; type: MediaType }) {
  const media = USE_FIXTURES
    ? MEDIA_FIXTURE
    : await fetch(`https://api.themoviedb.org/3/${type}/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      }).then((res) => res.json());

  // if (!response.ok) {
  //   throw new Error(`Failed to fetch ${type}`);
  // }

  return (
    <>
      <Stack.Screen
        options={{
          title: type === "movie" ? media.title : media.name,
        }}
      />

      <FadeIn>
        <MediaHero media={media} type={type} />
      </FadeIn>

      <FadeIn>
        <View
          style={{
            backgroundColor: AC.systemGroupedBackground,
            paddingBottom: 24,
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ fontSize: 16, color: label, lineHeight: 24 }}>
            {media.overview}
          </Text>
        </View>
      </FadeIn>

      <FadeIn>
        <View
          style={{
            paddingBottom: 24,
            paddingHorizontal: 16,
            backgroundColor: AC.systemGroupedBackground,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: label,
              marginBottom: 12,
            }}
          >
            About
          </Text>
          <View
            style={{
              backgroundColor: "rgba(120,120,128,0.12)",
              borderRadius: 10,
            }}
          >
            {[
              {
                label: type === "movie" ? "Release Date" : "First Air Date",
                value: new Date(
                  type === "movie" ? media.release_date : media.first_air_date
                ).toLocaleDateString(),
              },
              {
                label: "Age Rating",
                value: media.adult ? "Adult" : "All Ages",
              },
              {
                label: type === "movie" ? "Runtime" : "Episode Runtime",
                value:
                  type === "movie"
                    ? `${media.runtime} minutes`
                    : `${media.episode_run_time?.[0] || "N/A"} minutes`,
              },
              {
                label: "Budget",
                value: media.budget
                  ? `$${(media.budget / 1000000).toFixed(1)}M`
                  : "N/A",
              },
              {
                label: "Revenue",
                value: media.revenue
                  ? `$${(media.revenue / 1000000).toFixed(1)}M`
                  : "N/A",
              },
              {
                label: "Countries",
                value: media.production_countries
                  .map((c: { name: string }) => c.name)
                  .join(", "),
              },
              {
                label: "Languages",
                value: media.spoken_languages
                  .map((l: { name: string }) => l.name)
                  .join(", "),
              },
              {
                label: "Genres",
                value: media.genres
                  .map((g: { name: string }) => g.name)
                  .join(", "),
              },
            ].map((item, index, array) => (
              <View
                key={item.label}
                style={{
                  padding: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: index === array.length - 1 ? 0 : 0.5,
                  borderBottomColor: "rgba(120,120,128,0.2)",
                }}
              >
                <Text
                  style={{ fontSize: 16, color: label, opacity: 0.8, flex: 1 }}
                >
                  {item.label}
                </Text>
                <Text style={{ fontSize: 16, color: label, flex: 2 }}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </FadeIn>
    </>
  );
}

async function MediaVideos({ id, type }: { id: string; type: MediaType }) {
  const videos = USE_FIXTURES
    ? VIDEOS_FIXTURE
    : await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      }).then((res) => res.json());

  if (!videos.results.length) return null;

  return (
    <HorizontalList title="Teasers & Trailers">
      {videos.results.map((video: any) => (
        <VideoCard key={video.key} video={video} />
      ))}
    </HorizontalList>
  );
}

async function MediaCast({ id, type }: { id: string; type: MediaType }) {
  const credits = USE_FIXTURES
    ? CREDITS_FIXTURE
    : await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      }).then((res) => res.json());
  // console.log(JSON.stringify(credits));

  return (
    <HorizontalList title="Cast & Crew">
      {credits.cast?.slice(0, 10).map((person: any) => (
        <CastCard key={person.id} person={person} />
      ))}
    </HorizontalList>
  );
}

async function MediaCompanies({ id, type }: { id: string; type: MediaType }) {
  const media = USE_FIXTURES
    ? MEDIA_COMPANIES_FIXTURE
    : await fetch(`https://api.themoviedb.org/3/${type}/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      }).then((res) => res.json());

  return (
    <HorizontalList title="Companies">
      {media.production_companies.map((company: any) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </HorizontalList>
  );
}

async function SimilarMedia({ id, type }: { id: string; type: MediaType }) {
  const similar = USE_FIXTURES
    ? SIMILAR_MEDIA_FIXTURE
    : await fetch(`https://api.themoviedb.org/3/${type}/${id}/similar`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      }).then((res) => res.json());

  return (
    <HorizontalList title="More Like This">
      {similar.results?.slice(0, 10).map((media: any) => (
        <MediaCard key={media.id} media={media} type={type} />
      ))}
    </HorizontalList>
  );
}

function MovieSkeleton() {
  return (
    <View style={{ gap: 16 }}>
      <View
        style={{ height: 300, backgroundColor: "rgba(120,120,128,0.12)" }}
      />
      <View
        style={{
          height: 100,
          backgroundColor: "rgba(120,120,128,0.12)",
          margin: 16,
        }}
      />
    </View>
  );
}

function ListSkeleton() {
  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          height: 24,
          width: 200,
          backgroundColor: "rgba(120,120,128,0.12)",
          marginBottom: 12,
          marginHorizontal: 16,
        }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={{
              width: 140,
              height: 210,
              backgroundColor: "rgba(120,120,128,0.12)",
              marginHorizontal: 4,
              borderRadius: 8,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
