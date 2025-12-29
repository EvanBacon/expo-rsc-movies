"use server";

import { Image } from "@/components/img";
import { FadeIn } from "@/components/ui/FadeIn";
import TouchableBounce from "@/components/ui/TouchableBounce";
import * as AC from "@bacons/apple-colors";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { TRENDING_MEDIA_FIXTURE } from "./fixtures/search-fixtures";

const POSTER_WIDTH = 140;
const POSTER_HEIGHT = 210;
const USE_FIXTURES = false;

export async function renderSearchContents(query: string) {
  return (
    <View style={{ gap: 24 }}>
      <MoviesSection query={query} />

      <ShowsSection query={query} />

      <PeopleSection query={query} />
    </View>
  );
}

const MediaCard = ({
  id,
  title,
  rating,
  posterPath,
  type,
}: {
  id: number;
  title: string;
  rating: number;
  posterPath: string | null;
  type: "movie" | "show" | "person";
}) => (
  <Link key={id} href={`/${type}/${id}`} asChild>
    <TouchableBounce style={{ marginHorizontal: 4 }}>
      <View
        style={{
          width: POSTER_WIDTH,

          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: POSTER_WIDTH,
            height: POSTER_HEIGHT,
            backgroundColor: AC.systemGray5,
            borderRadius: 12,
          }}
        >
          {posterPath && (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w300${posterPath}` }}
              style={{ borderRadius: 12, width: "100%", height: "100%" }}
              transition={200}
            />
          )}
        </View>
        <View style={{ padding: 8 }}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: AC.label,
              marginBottom: 4,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: AC.systemPurple,
            }}
          >
            ★ {rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableBounce>
  </Link>
);

const PersonCard = ({
  id,
  name,
  department,
  profilePath,
}: {
  id: number;
  name: string;
  department: string;
  profilePath: string | null;
}) => (
  <Link key={id} href={`/person/${id}`} asChild>
    <TouchableBounce style={{ marginHorizontal: 4 }}>
      <View
        style={{
          width: POSTER_WIDTH,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: POSTER_WIDTH,
            height: POSTER_HEIGHT,
            backgroundColor: AC.systemGray5,
            borderRadius: 12,
          }}
        >
          {profilePath && (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w300${profilePath}` }}
              style={{ borderRadius: 12, width: "100%", height: "100%" }}
              transition={200}
            />
          )}
        </View>
        <View style={{ padding: 8 }}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: AC.label,
              marginBottom: 4,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: AC.secondaryLabel,
            }}
          >
            {department}
          </Text>
        </View>
      </View>
    </TouchableBounce>
  </Link>
);

async function MoviesSection({ query }: { query: string }) {
  const movies = await getMovies(query);
  if (!movies.length) return null;

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: AC.label,
          marginBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        Movies
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {movies.map((movie: any) => (
          <MediaCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            posterPath={movie.poster_path}
            type="movie"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const ShowsSection = async ({ query }: { query: string }) => {
  const shows = await getShows(query);
  if (!shows.length) return null;

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: AC.label,
          marginBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        TV Shows
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {shows.map((show: any) => (
          <MediaCard
            key={show.id}
            id={show.id}
            title={show.name}
            rating={show.vote_average}
            posterPath={show.poster_path}
            type="show"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const PeopleSection = async ({ query }: { query: string }) => {
  const people = await getPeople(query);
  if (!people.length) return null;

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: AC.label,
          marginBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        People
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {people.map((person: any) => (
          <PersonCard
            key={person.id}
            id={person.id}
            name={person.name}
            department={person.known_for_department}
            profilePath={person.profile_path}
          />
        ))}
      </ScrollView>
    </View>
  );
};

async function getMovies(query = "") {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

async function getShows(query = "") {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch shows");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching shows:", error);
    return [];
  }
}

async function getPeople(query = "") {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch people");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching people:", error);
    return [];
  }
}

export async function renderTrendingMedia({
  type,
  timeWindow,
  size,
}: {
  type: "movie" | "tv";
  timeWindow: "day" | "week";
  size: number;
}) {
  const data = USE_FIXTURES
    ? TRENDING_MEDIA_FIXTURE
    : await fetch(
        `https://api.themoviedb.org/3/trending/${type}/${timeWindow}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
          },
        }
      ).then((res) => res.json());

  // const data = await response.json();
  const shows = data.results.slice(0, size);
  return (
    <TrendingSection
      title={type === "tv" ? "TV Shows" : "Movies"}
      items={shows}
    />
  );
}

function TrendingSection({ title, items }: { title: string; items: any[] }) {
  return (
    <FadeIn>
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: AC.label,
            }}
          >
            Trending {title}
          </Text>
          {/* <Link href={`/trending/${title.toLowerCase()}`} asChild>
          <TouchableBounce>
            <Text style={{ 
              fontSize: 16,
              color: AC.systemPurple
            }}>
              See All
            </Text>
          </TouchableBounce>
        </Link> */}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          {items.map((item) => (
            <MediaCard
              key={item.id}
              id={item.id}
              title={item.title || item.name}
              rating={item.vote_average}
              posterPath={item.poster_path}
              type={title === "Movies" ? "movie" : "show"}
            />
          ))}
        </ScrollView>
      </>
    </FadeIn>
  );
}
